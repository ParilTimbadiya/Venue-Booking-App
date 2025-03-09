package com.sahajinfotech.crickhero.service;

import com.sahajinfotech.crickhero.config.email.EmailDetailsDto;
import com.sahajinfotech.crickhero.config.email.EmailService;
import com.sahajinfotech.crickhero.config.jwt.JwtService;
import com.sahajinfotech.crickhero.dto.AuthResponse;
import com.sahajinfotech.crickhero.dto.AuthRequest;
import com.sahajinfotech.crickhero.model.User;
import com.sahajinfotech.crickhero.repository.UserRepo;
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

    public ResponseEntity<?> signupUser(User user) {
        try {
            if (userRepo.findByEmail(user.getEmail()) != null)
                return new ResponseEntity<>("Already exist!", HttpStatus.OK);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole("ROLE_USER");
            if (userRepo.save(user) != null) {
                String emailBody = "Dear " + user.getUserName() + ",\n\n" +
                        "Welcome to CrickHero! We are thrilled to have you on board.\n\n" +
                        "Your registration has been successfully completed. Here are your account details:\n\n" +
                        "User Details:\n" +
                        "- Username: " + user.getUserName() + "\n" +
                        "- Email: " + user.getEmail() + "\n" +
                        "- City: " + user.getCity() + "\n\n" +
                        "You can now explore and book cricket venues, join exciting matches, and connect with other cricket enthusiasts.\n\n" +
                        "If you have any questions or need assistance, feel free to contact us.\n\n" +
                        "Thank you for choosing CrickHero!\n\n" +
                        "Best regards,\n" +
                        "CrickHero Team\n" +
                        "+91 97148 92058\n" +
                        "sahaj1032@gmail.com";

                String adminEmailBody = "Dear Admin,\n\n" +
                        "A new user has successfully registered on the CrickHero platform. Below are the details of the user:\n\n" +
                        "User Details:\n" +
                        "- Username: " + user.getUserName() + "\n" +
                        "- Email: " + user.getEmail() + "\n" +
                        "- City: " + user.getCity() + "\n\n" +
                        "Please ensure that the user receives a warm welcome and has a seamless experience on our platform.\n\n" +
                        "Best regards,\n" +
                        "CrickHero Team";
                EmailDetailsDto emailDetailsDto = EmailDetailsDto.builder()
                        .subject("Registration successfully done")
                        .recipient(user.getEmail())
                        .msgBody(emailBody)
                        .build();
                emailService.sendSimpleMail(emailDetailsDto);
                EmailDetailsDto adminEmailDetails = EmailDetailsDto.builder()
                        .subject("New user added!!")
                        .recipient("sahaj1032@gmail.com") // Replace with the admin's email address
                        .msgBody(adminEmailBody)
                        .build();

                emailService.sendSimpleMail(adminEmailDetails);
                return new ResponseEntity<>("Sign up successfully", HttpStatus.OK);
            }
            else
                return new ResponseEntity<>("Sign up not done!", HttpStatus.OK);
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
}
