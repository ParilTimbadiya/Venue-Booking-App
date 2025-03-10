package com.cricboard.controller;

import com.cricboard.config.email.EmailDetailsDto;
import com.cricboard.config.email.EmailService;
import com.cricboard.dto.AuthRequest;
import com.cricboard.dto.Contactus;
import com.cricboard.model.Product;
import com.cricboard.model.User;
import com.cricboard.model.Venue;
import com.cricboard.service.ProductService;
import com.cricboard.service.UserService;
import com.cricboard.service.VenueService;
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
                    "Cricboard Team\n" +
                    "official.cricboard@gmail.com";
            EmailDetailsDto adminEmailDetails = EmailDetailsDto.builder()
                    .subject("Contact Information!!")
                    .recipient("official.cricboard@gmail.com") // Replace with the admin's email address
                    .msgBody(msg)
                    .build();

            emailService.sendSimpleMail(adminEmailDetails);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
