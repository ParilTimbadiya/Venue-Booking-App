package com.sahajinfotech.crickhero.controller;

import com.sahajinfotech.crickhero.config.jwt.JwtService;
import com.sahajinfotech.crickhero.dto.BookingRequestDto;
import com.sahajinfotech.crickhero.model.TimeSlot;
import com.sahajinfotech.crickhero.model.Venue;
import com.sahajinfotech.crickhero.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("crickhero")
public class VenueController {
    @Autowired
    VenueService venueService;
    @Autowired
    JwtService jwtService;


    @GetMapping("/venuelist")
    @ResponseStatus(HttpStatus.OK)
    public List<Venue> getAllVenue() {
        return venueService.getAllVenue();
    }

    @PostMapping(value = "auth/addvenues", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addVenue(
            @RequestParam("name") String name,
            @RequestParam("image") MultipartFile image,
            @RequestParam("price") int price,
            @RequestParam("state") String state,
            @RequestParam("city") String city,
            @RequestParam("address") String address) {
        try {
            Venue venue = new Venue();
            venue.setName(name);
            venue.setPrice(price);
            venue.setState(state);
            venue.setCity(city);
            venue.setAddress(address);
            return venueService.addVenue(image, venue);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing request " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("auth/delete/{venueId}")
    public ResponseEntity<Void> deleteVenue(@PathVariable int venueId) {
        System.out.println(venueId);
        boolean isRemoved = venueService.removeVenue(venueId);
        if (!isRemoved) {
            return ResponseEntity.notFound().build(); // Return 404 if venue not found
        }
        return ResponseEntity.noContent().build(); // Return 204 No Content on successful deletion
    }

    @PostMapping("auth/bookings")
    public ResponseEntity<?> booking(@RequestHeader("Authorization") String header, @RequestBody BookingRequestDto bookingRequestDto) {
        String email = "";
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            email = jwtService.extractUsername(token);
            if(bookingRequestDto.getBookingDate().isAfter(LocalDate.now().minusDays(1))) {
                if (bookingRequestDto.getBookingDate().isEqual(LocalDate.now()) && !bookingRequestDto.getStartTime().isAfter(LocalTime.now()))
                    return new ResponseEntity<>("Not valid date and time",HttpStatus.NOT_ACCEPTABLE);
                else
                    return venueService.booking(email, bookingRequestDto);
            }
            else
                return new ResponseEntity<>("Not valid date and time",HttpStatus.NOT_ACCEPTABLE);

        }
        return new ResponseEntity<>(email+" not found",HttpStatus.NOT_FOUND);
    }

    @GetMapping("auth/bookings")
    public ResponseEntity<List<TimeSlot>> getSlots(
            @RequestParam Long venueId,
            @RequestParam String date) {
        return venueService.getSlots(venueId,date);
    }

    @PostMapping("auth/matchdata")
    public ResponseEntity<?> getMatchData(@RequestBody Object object){
        System.out.println(object.toString());
        System.out.println();
        return new ResponseEntity<>(object,HttpStatus.OK);
    }
}
