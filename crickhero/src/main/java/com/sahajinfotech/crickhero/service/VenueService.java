package com.sahajinfotech.crickhero.service;

import com.cloudinary.Cloudinary;
import com.sahajinfotech.crickhero.config.email.EmailDetailsDto;
import com.sahajinfotech.crickhero.config.email.EmailService;
import com.sahajinfotech.crickhero.dto.BookingRequestDto;
import com.sahajinfotech.crickhero.exception.CustomException;
import com.sahajinfotech.crickhero.model.Booking;
import com.sahajinfotech.crickhero.model.TimeSlot;
import com.sahajinfotech.crickhero.model.User;
import com.sahajinfotech.crickhero.model.Venue;
import com.sahajinfotech.crickhero.repository.BookingRepo;
import com.sahajinfotech.crickhero.repository.TimeSlotRepo;
import com.sahajinfotech.crickhero.repository.UserRepo;
import com.sahajinfotech.crickhero.repository.VenueRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class VenueService {
    @Autowired
    Cloudinary cloudinaryTemplate;
    @Autowired
    VenueRepo venueRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    TimeSlotRepo timeSlotRepo;

    @Autowired
    EmailService emailService;
    @Autowired
    BookingRepo bookingRepo;

    public ResponseEntity<List<TimeSlot>> getSlots(Long venueId, String date) {
        LocalDate bookingDate = LocalDate.parse(date);
        List<TimeSlot> slots = timeSlotRepo.findByVenueIdAndBookingDate(venueId, bookingDate);
        for (TimeSlot timeSlot : slots) {
            timeSlot.getVenue().setTimeSlots(null);
            timeSlot.getVenue().setBookingList(null);
        }
        return new ResponseEntity<>(slots, HttpStatus.OK);
    }

    public List<Venue> getAllVenue() {
        List<Venue> venues = venueRepo.findAll();
        for (Venue venue : venues) {
            venue.setBookingList(null);
            venue.setTimeSlots(null);
        }
        return venues;
    }

    @Transactional
    public ResponseEntity<?> addVenue(MultipartFile multipartFile, Venue venue) {
        try {
            Map image = cloudinaryTemplate.uploader().upload(multipartFile.getBytes(), Collections.emptyMap());
            String imageUrl = (String) image.get("url");
            venue.setImageUrl(imageUrl);
            return new ResponseEntity<>(venueRepo.save(venue), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    public ResponseEntity<?> booking(String email, BookingRequestDto bookingRequestDto) {
        // Fetch the user and venue
        User user = userRepo.findByEmail(email);
        Venue venue = venueRepo.findById(bookingRequestDto.getVenueId())
                .orElseThrow(() -> new CustomException("Venue not found"));

        // Parse startTime and endTime
        LocalTime startTime = bookingRequestDto.getStartTime();
        LocalTime endTime = bookingRequestDto.getEndTime();

        // Adjust for midnight crossover
        LocalDate bookingDate = bookingRequestDto.getBookingDate();
        LocalDate adjustedEndDate = endTime.isBefore(startTime) ? bookingDate.plusDays(1) : bookingDate;

        // Calculate the total hours
        LocalDateTime startDateTime = LocalDateTime.of(bookingDate, startTime);
        LocalDateTime endDateTime = LocalDateTime.of(adjustedEndDate, endTime);

        Duration duration = Duration.between(startDateTime, endDateTime);
        long hours = duration.toHours();

        if (hours <= 0) {
            return new ResponseEntity<>("Invalid time range: End time must be after start time", HttpStatus.BAD_REQUEST);
        }

        // Check if the slot is already booked
        List<TimeSlot> conflictingSlots = timeSlotRepo.findSlotsBetween(
                venue.getVenueId(),
                bookingDate,
                startTime,
                endTime.isBefore(startTime) ? LocalTime.MAX : endTime.minusHours(1) // Handle midnight crossover
        );

        if (!conflictingSlots.isEmpty()) {
            return new ResponseEntity<>("One or more slots are already booked", HttpStatus.ALREADY_REPORTED);
        }

        // Create new time slots for the booking
        for (int i = 0; i < hours; i++) {
            LocalTime slotTime = startTime.plusHours(i).withHour((startTime.getHour() + i) % 24);
            LocalDate slotDate = slotTime.isBefore(startTime) ? bookingDate.plusDays(1) : bookingDate;

            TimeSlot timeSlot = TimeSlot.builder()
                    .slotTime(slotTime)
                    .isBooked(true)
                    .date(slotDate)
                    .venue(Venue.builder().venueId(venue.getVenueId()).build())
                    .build();

            venue.getTimeSlots().add(timeSlot);
        }

        // Create and save the booking
        Booking venueBooking = Booking.builder()
                .bookingDate(bookingDate)
                .start_time(startTime)
                .end_time(bookingRequestDto.getEndTime()) // Store the original end time
                .total_hours(hours)
                .total_cost(hours * venue.getPrice())
                .created_at(LocalDateTime.now())
                .venue(Venue.builder().venueId(venue.getVenueId()).build())
                .user(User.builder().userId(user.getUserId()).build())
                .build();

        // Save the booking explicitly to get the generated ID
        Booking savedBooking = bookingRepo.save(venueBooking);

        // Add the booking to the venue's booking list (optional, if needed)
        venue.getBookingList().add(savedBooking);

        // Save the venue and user to persist other changes
        venueRepo.save(venue);
        userRepo.save(user);

        // Retrieve the booking ID
        Long bookingId = savedBooking.getBookingId();

        // Prepare and send the email
        String emailBody = "Dear " + user.getUserName() + ",\n\n" +
                "We are delighted to confirm your cricket venue booking! Below are the details of your reservation:\n\n" +
                "Booking Details:\n" +
                "- Booking ID: " + bookingId + "\n" +
                "- Booking Date: " + savedBooking.getBookingDate() + "\n" +
                "- Start Time: " + savedBooking.getStart_time() + "\n" +
                "- End Time: " + savedBooking.getEnd_time() + "\n" +
                "- Total Duration: " + savedBooking.getTotal_hours() + " hours\n" +
                "- Total Cost: ₹" + savedBooking.getTotal_cost() + "\n\n" +
                "We look forward to hosting your game and ensuring you have a great experience at our venue.\n\n" +
                "Thank you for choosing us for your cricket matches!\n\n" +
                "Best regards,\n" +
                venue.getName() + "\n" +
                "+91 97148 92058\n" +
                "sahaj1032@gmail.com";

        EmailDetailsDto emailDetailsDto = EmailDetailsDto.builder()
                .subject("Cricket Venue Booking Confirmation")
                .recipient(user.getEmail())
                .msgBody(emailBody)
                .build();
        emailService.sendSimpleMail(emailDetailsDto);

        return new ResponseEntity<>("Booking done successfully with Booking ID: " + bookingId, HttpStatus.OK);
    }




}
