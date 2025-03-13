package com.cricboard.controller;

import com.cricboard.config.jwt.JwtService;
import com.cricboard.dto.BookingRequestDto;
import com.cricboard.model.Product;
import com.cricboard.model.TimeSlot;
import com.cricboard.model.Venue;
import com.cricboard.service.ProductService;
import com.cricboard.service.VenueService;
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
@RequestMapping("crickhero/auth/")
public class VenueController {
    @Autowired
    JwtService jwtService;
    @Autowired
    VenueService venueService;
    @Autowired
    ProductService productService;


    @PostMapping("addequipment")
    public ResponseEntity<?> addEquipment(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("price") int price,
            @RequestPart("image") MultipartFile image)
    {
        try {
            Product product = new Product();
            product.setTitle(title);
            product.setDescription(description);
            product.setPrice(price);
            return productService.addProduct(image, product);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing request " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "addvenues", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
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





    @DeleteMapping("delete/{venueId}")
    public ResponseEntity<Void> deleteVenue(@PathVariable int venueId) {
        System.out.println(venueId);
        boolean isRemoved = venueService.removeVenue(venueId);
        if (!isRemoved) {
            return ResponseEntity.notFound().build(); // Return 404 if venue not found
        }
        return ResponseEntity.noContent().build(); // Return 204 No Content on successful deletion
    }

    @PostMapping("bookings")
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

    @GetMapping("bookings")
    public ResponseEntity<List<TimeSlot>> getSlots(
            @RequestParam Long venueId,
            @RequestParam String date) {
        return venueService.getSlots(venueId,date);
    }

//    @PostMapping("matchdata")
//    public ResponseEntity<?> getMatchData(@RequestBody Object object){
//        System.out.println(object.toString());
//        System.out.println();
//        return new ResponseEntity<>(object,HttpStatus.OK);
//    }
}
