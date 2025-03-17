package com.cricboard.service;

import com.cricboard.model.Booking;
import com.cricboard.repository.UserRepo;
import com.cricboard.config.email.EmailDetailsDto;
import com.cricboard.config.email.EmailService;
import com.cricboard.config.jwt.JwtService;
import com.cricboard.dto.AuthResponse;
import com.cricboard.dto.AuthRequest;
import com.cricboard.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.GrantedAuthority;

import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtService jwtService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    EmailService emailService;

    public static String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // Generates a number between 100000 and 999999
        return String.valueOf(otp);
    }

    public ResponseEntity<?> signupUser(User user) {
        try {
            User temp = userRepo.findByEmail(user.getEmail());
            if (temp != null)
                return new ResponseEntity<>("Already exist!", HttpStatus.OK);
            if (temp!=null && temp.getUserName().equals(user.getUserName()))
                return new ResponseEntity<>("Username already exist!", HttpStatus.OK);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole("ROLE_USER");
            if (user.getEmail().equals("official.cricboard@gmail.com"))
                user.setRole("ROLE_ADMIN");
            if (userRepo.save(user) != null) {
                String emailBody = String.format("""
                    Dear %s,
                    
                    Welcome to Cricboard! We're delighted to have you join our community.
                    
                    Your registration has been successfully completed. Please find your account details below:
                    
                    USER INFORMATION
                    ───────────────────────
                    Username: %s
                    Email: %s
                    Location: %s, %s
                    ───────────────────────
                    
                    You can now explore our platform to book cricket venues, view live scoreboard, manage local score and buy cricket products.
                    
                    If you have any questions or need assistance, our support team is always ready to help.
                    
                    Thank you for choosing CricBoard!
                    
                    Best regards,
                    Cricboard Team
                    official.cricboard@gmail.com
                    """,
                        user.getUserName(),
                        user.getUserName(),
                        user.getEmail(),
                        user.getCity(),
                        user.getState());

                // Admin notification email with professional formatting
                String adminEmailBody = String.format("""
                    Dear Admin,
                    
                    A new user has successfully registered on the Cricboard platform.
                    
                    USER DETAILS
                    ───────────────────────
                    Username: %s
                    Email: %s
                    Location: %s, %s
                    Registration Date: %s
                    ───────────────────────
                    
                    Please ensure the user receives a warm welcome and experiences a seamless onboarding process.
                    
                    Best regards,
                    Cricboard Team
                    """,
                        user.getUserName(),
                        user.getEmail(),
                        user.getCity(),
                        user.getState(),
                        java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))); // CHANGE MARKER - Added timestamp


                EmailDetailsDto userEmail = EmailDetailsDto.builder()
                        .subject("Welcome to Cricboard - Registration Successful!")
                        .recipient(user.getEmail())
                        .msgBody(emailBody)
                        .build();
                emailService.sendSimpleMail(userEmail); // FIXED: Uncommented to enable email sending // CHANGE MARKER

                // Send notification email to the admin
                EmailDetailsDto adminEmail = EmailDetailsDto.builder()
                        .subject("New User Registration Alert - Cricboard")
                        .recipient("official.cricboard@gmail.com")
                        .msgBody(adminEmailBody)
                        .build();
                emailService.sendSimpleMail(adminEmail); // FIXED: Uncommented to enable email sending // CHANGE MARKER

                return new ResponseEntity<>("Registration confirmation emails sent successfully", HttpStatus.OK);
            }
            else
                return new ResponseEntity<>("Registration not done!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> signinUser(AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        UserDetails userDetails = userDetailsService.loadUserByUsername(authentication.getName());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtService.generateToken(userDetails.getUsername());
        boolean isAdmin = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ADMIN"));
        AuthResponse authResponse = new AuthResponse(token,HttpStatus.OK,isAdmin?"admin":"user");
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    public boolean sendOtpToEmail(String email) {
        try{
            User user = userRepo.findByEmail(email);

            if(user!=null){
                String otp = UserService.generateOtp();
                user.setOtp(otp);
                if(userRepo.save(user)!=null) {
                    String emailBody = String.format("""
                                    Dear %s,
                                                    
                                    Your OTP for password reset is: %s
                                                    
                                    Please use this OTP to reset your password. If you did not request this, please ignore this email.
                                                    
                                    Best regards,
                                    Cricboard Team
                                    official.cricboard@gmail.com
                                    """,
                            user.getUserName(), // Assuming you have the user's name
                            otp); // The generated OTP

                    EmailDetailsDto userEmail = EmailDetailsDto.builder()
                            .subject("Cricboard - OTP for Password Reset")
                            .recipient(user.getEmail())
                            .msgBody(emailBody)
                            .build();
                    emailService.sendSimpleMail(userEmail);
                    return true;
                }
                else {
                    return false;
                }
            }else{
                return false;
            }
        }catch (Exception e){
            return false;
        }
    }

    public boolean resetPassword(String email, String otp, String newPassword) {
        try{
            User user = userRepo.findByEmail(email);
            if(user!=null && user.getOtp().equals(otp)){
                user.setPassword(passwordEncoder.encode(newPassword));
                user.setOtp("");
                if(userRepo.save(user)!=null){
                    String emailBody = String.format("""
                Dear %s,
                
                Your password has been reset successfully.
                
                You can now log in with your new password. If you did not request this change, please contact our support team immediately.
                
                Best regards,
                Cricboard Team
                official.cricboard@gmail.com
                """,
                            user.getUserName()); // Assuming you have the user's name

                    EmailDetailsDto userEmail = EmailDetailsDto.builder()
                            .subject("Cricboard - Password Reset Successful")
                            .recipient(user.getEmail())
                            .msgBody(emailBody)
                            .build();
                    emailService.sendSimpleMail(userEmail);
                    return true;
                }
            }
            return false;
        }catch (Exception e){
            return false;
        }
    }

    public List<User> getAllUser() {
        List<User> sortedList = userRepo.findAll().stream()
                .sorted(Comparator.comparing(User::getEmail).reversed())
                .collect(Collectors.toList());
        for (User i : sortedList){
            i.setOtp(null);
            i.setPassword(null);
            i.setBookingList(null);
            i.setRole(null);
            i.setCartItemList(null);
        }
        return sortedList;
    }
}
