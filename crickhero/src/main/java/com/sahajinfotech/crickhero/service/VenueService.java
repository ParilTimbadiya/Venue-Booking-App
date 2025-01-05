package com.sahajinfotech.crickhero.service;

import com.cloudinary.Cloudinary;
import com.sahajinfotech.crickhero.dto.BookingRequestDto;
import com.sahajinfotech.crickhero.exception.CustomException;
import com.sahajinfotech.crickhero.model.Booking;
import com.sahajinfotech.crickhero.model.TimeSlot;
import com.sahajinfotech.crickhero.model.User;
import com.sahajinfotech.crickhero.model.Venue;
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

    public ResponseEntity<List<TimeSlot>> getSlots(Long venueId, String date) {
        LocalDate bookingDate = LocalDate.parse(date);
        List<TimeSlot> slots = timeSlotRepo.findByVenueIdAndBookingDate(venueId, bookingDate);
        for (TimeSlot timeSlot : slots){
            timeSlot.setVenue(timeSlot.getVenue().setTimeSlots(null).setBookingList(null));
        }
        return new ResponseEntity<>(slots, HttpStatus.OK);
    }

    public List<Venue> getAllVenue() {
        List<Venue> venues = venueRepo.findAll();
        for(Venue venue : venues){
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

        // Calculate the duration and total hours
        Duration duration = Duration.between(bookingRequestDto.getStartTime(), bookingRequestDto.getEndTime());
        long hours = duration.toHours();
        System.out.println(bookingRequestDto.toString());
        // Check if the slot is already booked
        List<TimeSlot> conflictingSlots = timeSlotRepo.findSlotsBetween(
                venue.getVenueId(),
                bookingRequestDto.getBookingDate(),
                bookingRequestDto.getStartTime(),
                bookingRequestDto.getEndTime().minusHours(1)
        );
        for(TimeSlot timeSlot : conflictingSlots)
            System.out.println(timeSlot);

        if (!conflictingSlots.isEmpty()) {
            return new ResponseEntity<>("One or more slots are already booked", HttpStatus.ALREADY_REPORTED);
        }

        // Create new time slots for the booking
        for (int i = bookingRequestDto.getStartTime().getHour(); i < bookingRequestDto.getEndTime().getHour(); i++) {
            TimeSlot timeSlot = new TimeSlot()
                    .setSlotTime(LocalTime.of(i, 0))
                    .setBooked(true)
                    .setDate(bookingRequestDto.getBookingDate())
                    .setVenue(venue);

            // Add the new time slot to the existing time slots
            venue.getTimeSlots().add(timeSlot);
        }

        // Create a new booking for the venue
        Booking venueBooking = new Booking()
                .setBookingDate(bookingRequestDto.getBookingDate())
                .setStart_time(bookingRequestDto.getStartTime())
                .setEnd_time(bookingRequestDto.getEndTime())
                .setTotal_hours(hours)
                .setTotal_cost(hours * venue.getPrice())
                .setVenue(venue)
                .setUser(user);

        // Add the booking to the venue's booking list
        venue.getBookingList().add(venueBooking);


        // Save both the venue and user to persist changes
//        venueRepo.save(venue);
//        userRepo.save(user);

        return new ResponseEntity<>("Booking done successfully", HttpStatus.OK);
    }
}
