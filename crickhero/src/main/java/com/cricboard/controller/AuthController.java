package com.cricboard.controller;

import com.cricboard.config.email.EmailDetailsDto;
import com.cricboard.config.email.EmailService;
import com.cricboard.dto.AuthRequest;
import com.cricboard.dto.Contactus;
import com.cricboard.model.Booking;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

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

    @PostMapping("/addequipment")
    public ResponseEntity<?> addEquipment(@RequestHeader("Authorization") String header,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("price") int price,
            @RequestPart("image") MultipartFile image)
    {
        try {
            System.out.println(header);
            Product product = new Product();
            product.setTitle(title);
            product.setDescription(description);
            product.setPrice(price);
            return productService.addProduct(image, product);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing request " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        // Logic to generate and send OTP
        boolean isSent = userService.sendOtpToEmail(email);
        if (isSent) {
            return ResponseEntity.ok("OTP sent to your email!");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending OTP.");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        String newPassword = request.get("newPassword");
        // Logic to validate OTP and reset password
        boolean isReset = userService.resetPassword(email, otp, newPassword);
        if (isReset) {
            return ResponseEntity.ok("Password reset successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP or email.");
        }
    }
    @GetMapping("/productlist")
    public ResponseEntity<List<Product>> getAllProduct() {
        return new ResponseEntity<>(productService.getAllProduct(),HttpStatus.OK);
    }
    @GetMapping("/booking-data")
    public ResponseEntity<List<Booking>> getAllBooking() {
        return new ResponseEntity<>(venueService.getAllBooking(),HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUser(),HttpStatus.OK);
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
