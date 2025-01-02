package com.sahajinfotech.crickhero.service;

import com.cloudinary.Cloudinary;
import com.sahajinfotech.crickhero.model.Venue;
import com.sahajinfotech.crickhero.repository.VenueRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class VenueService {
    @Autowired
    Cloudinary cloudinaryTemplate;
    @Autowired
    VenueRepo venueRepo;

    public List<Venue> getAllVenue() {
        return venueRepo.findAll();
    }

    public ResponseEntity<?> addVenue(MultipartFile multipartFile, Venue venue) {
        try {
            Map image =cloudinaryTemplate.uploader().upload(multipartFile.getBytes(), Collections.emptyMap());
            String imageUrl = (String) image.get("url");
            venue.setImageUrl(imageUrl);
            return new ResponseEntity<>(venueRepo.save(venue), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
