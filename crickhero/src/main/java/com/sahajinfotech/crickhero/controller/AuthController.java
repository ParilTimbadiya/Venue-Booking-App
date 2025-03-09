package com.sahajinfotech.crickhero.controller;

import com.sahajinfotech.crickhero.config.email.EmailDetailsDto;
import com.sahajinfotech.crickhero.config.email.EmailService;
import com.sahajinfotech.crickhero.dto.AuthRequest;
import com.sahajinfotech.crickhero.dto.Contactus;
import com.sahajinfotech.crickhero.model.Product;
import com.sahajinfotech.crickhero.model.User;
import com.sahajinfotech.crickhero.model.Venue;
import com.sahajinfotech.crickhero.service.ProductService;
import com.sahajinfotech.crickhero.service.UserService;
import com.sahajinfotech.crickhero.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * AuthController - Handles user-related operations
 * 
 * This controller manages:
 * - User registration (signup)
 * - User authentication (signin)
 */
@RestController
@RequestMapping("crickhero")
public class AuthController {
    @Autowired
    ProductService productService;
    @Autowired
    EmailService emailService;
    @Autowired
    private UserService userService;
    @Autowired
    VenueService venueService;

    /**
     * Handles user registration
     * 
     * @param user User object containing registration details
     * @return ResponseEntity with registration result
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody User user) {
        return userService.signupUser(user);
    }

    /**
     * Handles user authentication
     * 
     * @param authRequest AuthRequest object containing login credentials
     * @return ResponseEntity with authentication result and JWT token
     */
    @PostMapping("/signin")
    public ResponseEntity<?> signinUser(@RequestBody AuthRequest authRequest) {
        return userService.signinUser(authRequest);
    }



    @GetMapping("/productlist")
    public ResponseEntity<List<Product>> getAllProduct() {
        System.out.println("getallproducts");
        return new ResponseEntity<>(productService.getAllProduct(),HttpStatus.OK);
    }

    @GetMapping("/venuelist")
    @ResponseStatus(HttpStatus.OK)
    public List<Venue> getAllVenue() {
        return venueService.getAllVenue();
    }

    @PostMapping("/contact")
    public ResponseEntity<?> handleContactus(@RequestBody Contactus contactus){
        try{
            String msg = "Dear Admin,\n\n" +
                    "A new inquiry has been submitted through the Contact Us page. Here are the details:\n\n" +
                    "User Details:\n" +
                    "- Name: " + contactus.getName() + "\n" +
                    "- Email: " + contactus.getEmail() + "\n\n" +
                    "Message:\n" +
                    contactus.getMessage() + "\n\n" +
                    "Please review and take appropriate action.\n\n" +
                    "Best regards,\n" +
                    "CrickHero Team\n" +
                    "+91 97148 92058\n" +
                    "sahaj1032@gmail.com";
            EmailDetailsDto adminEmailDetails = EmailDetailsDto.builder()
                    .subject("Contact Information!!")
                    .recipient("sahaj1032@gmail.com") // Replace with the admin's email address
                    .msgBody(msg)
                    .build();

            emailService.sendSimpleMail(adminEmailDetails);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
