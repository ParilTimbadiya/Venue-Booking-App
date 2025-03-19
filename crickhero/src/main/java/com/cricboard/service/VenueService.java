package com.cricboard.service;

import com.cloudinary.Cloudinary;
import com.cricboard.exception.CustomException;
import com.cricboard.model.Booking;
import com.cricboard.model.TimeSlot;
import com.cricboard.model.User;
import com.cricboard.model.Venue;
import com.cricboard.repository.*;
import com.cricboard.config.email.EmailDetailsDto;
import com.cricboard.config.email.EmailService;
import com.cricboard.dto.BookingRequestDto;
import com.cricboard.model.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

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
    @Autowired
    MerchantPaymentRepo merchantPaymentRepo;
    @Value("${spring.admin.username}")
    private String adminMail;

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
        List<Venue> premiumVenueList = new ArrayList<>();
        for (Venue venue : venues) {
            venue.setBookingList(null);
            venue.setTimeSlots(null);
            if(venue.isShow()){
                premiumVenueList.add(venue);
            }
        }
        return premiumVenueList;
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

        // FIXED: Begin email sending section - uncommented and fixed missing phone field issue // CHANGE MARKER
        try {
            // User confirmation email with professional formatting
            String emailBody = String.format("""
            Dear %s,
            
            BOOKING CONFIRMATION - #%s
            
            Thank you for booking with Cricboard. Your cricket venue reservation has been confirmed!
            
            VENUE & BOOKING DETAILS
            ───────────────────────
            Venue: %s
            Location: %s
            Booking ID: %s
            Date: %s
            Time: %s - %s
            Duration: %s hour
            Price per hour : %s
            Total Amount: ₹%s
            ───────────────────────
            
            Please arrive 15 minutes before your scheduled time. Our venue staff will be ready to assist you.
            
            We look forward to providing you with an exceptional cricket experience at one of our premium facilities. 
            If you need to make any changes to your booking, please contact us at least 24 hours in advance.
            
            Thank you for choosing Cricboard - Home of Cricket Excellence!
            
            Best regards,
            Cricboard Management
            Contact: official.cricboard@gmail.com
            """,
                    user.getUserName(),
                    bookingId,
                    venue.getName(),
                    venue.getAddress(),
                    bookingId,                         // FIXED: Corrected to include booking ID // CHANGE MARKER
                    savedBooking.getBookingDate(),
                    savedBooking.getStart_time(),
                    savedBooking.getEnd_time(),
                    savedBooking.getTotal_hours(),
                    venue.getPrice(),
                    savedBooking.getTotal_cost());

            // Admin notification email with professional formatting
            String adminEmailBody = String.format("""
            Dear Admin,
            
            NEW BOOKING ALERT - #%s
            
            A new cricket venue booking has been confirmed in the Cricboard network.
            
            VENUE & BOOKING DETAILS
            ───────────────────────
            Venue Name: %s
            Venue Location: %s
            Booking ID: %s
            Date: %s
            Time: %s - %s
            Duration: %s hours
            Price per hour : %s
            Total Amount: ₹%s
            ───────────────────────
            
            CUSTOMER INFORMATION
            ───────────────────────
            Name: %s
            Email: %s
            ───────────────────────
            
            ACTION ITEMS:
            • Notify the venue manager about this new booking
            • Ensure the venue is prepared 30 minutes before the scheduled time
            • Verify all equipment is in proper working condition
            • Update the central Cricboard booking system
            • Contact the customer for any special requirements
            
            For any scheduling conflicts or issues, please coordinate with the venue manager and contact the customer directly.
            
            Thank you for maintaining our booking standards across all Cricboard venues.
            
            Best regards,
            Cricboard Operations Team
            official.cricboard@gmail.com
            """,
                    bookingId,
                    venue.getName(),
                    venue.getAddress(),
                    bookingId,
                    savedBooking.getBookingDate(),
                    savedBooking.getStart_time(),
                    savedBooking.getEnd_time(),
                    savedBooking.getTotal_hours(),
                    venue.getPrice(),
                    savedBooking.getTotal_cost(),
                    user.getUserName(),
                    user.getEmail());

            // Send confirmation email to the user
            EmailDetailsDto userConfirmation = EmailDetailsDto.builder()
                    .subject("Booking Confirmation: " + venue.getName() + " Cricket Venue Reserved! [ID: " + bookingId + "]")
                    .recipient(user.getEmail())
                    .msgBody(emailBody)
                    .build();
            emailService.sendSimpleMail(userConfirmation);

            // Send a copy to cricboard official email for record keeping
            EmailDetailsDto officialEmailCopy = EmailDetailsDto.builder()
                    .subject("New Booking Alert: " + venue.getName() + " at " + venue.getAddress() + " [ID: " + bookingId + "]")
                    .recipient("official.cricboard@gmail.com")
                    .msgBody(adminEmailBody)
                    .build();
            emailService.sendSimpleMail(officialEmailCopy);

        } catch (Exception e) {
            // Log the error but continue with the booking process
            System.err.println("Error sending email notification: " + e.getMessage()); // CHANGE MARKER
            // The booking was successful, so we still return success even if email fails
        }


        return new ResponseEntity<>("Your booking at " + venue.getName() + " has been confirmed! Booking ID: " + bookingId, HttpStatus.OK);
    }

    @Transactional
    public boolean removeVenue(int venueId) {
        try{
            venueRepo.deleteById(venueId);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    public List<Booking> getAllBooking() {
        List<Booking> sortedList = bookingRepo.findAll().stream()
                .sorted(Comparator.comparing(Booking::getBookingDate).reversed())
                .collect(Collectors.toList());
        for (Booking i : sortedList){
            i.getVenue().setBookingList(null);
            i.getVenue().setTimeSlots(null);
            User temp = new User();
            temp.setEmail(i.getUser().getEmail());
            i.setUser(temp);
        }
        return  sortedList;
    }

    public ResponseEntity<?> processPayment(MerchantPayment merchantPayment,User user) {
        if(user.getExpiration_month()==null)
            user.setExpiration_month(LocalDate.now());
        user.setExpiration_month(user.getExpiration_month().plusMonths(merchantPayment.getMonths()));

        merchantPaymentRepo.save(merchantPayment);
        userRepo.save(user);
        if(user.getExpiration_month().isAfter(LocalDate.now()) || user.getExpiration_month().isEqual(LocalDate.now())) {
            List<Venue> venues = venueRepo.findAllVenueByMerchantEmail(user.getEmail());
            for (Venue venue : venues) {
                venue.setShow(true);
            }
            venueRepo.saveAll(venues);
        }
        return ResponseEntity.ok("Payment processed successfully");
    }
}