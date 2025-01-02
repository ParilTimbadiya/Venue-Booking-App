package com.sahajinfotech.crickhero.controller;

import com.sahajinfotech.crickhero.model.Venue;
import com.sahajinfotech.crickhero.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("crickhero")
public class VenueController {
    @Autowired
    VenueService venueService;
    @GetMapping("/venuelist")
    @ResponseStatus(HttpStatus.OK)
    public List<Venue> getAllVenue(){
        System.out.println("venuelist called");
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
            return venueService.addVenue(image,venue);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing request", HttpStatus.BAD_REQUEST);
        }
    }
}
