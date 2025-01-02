package com.sahajinfotech.crickhero.service;

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

    public ResponseEntity<?> signupUser(User user) {
        try {
            if (userRepo.findByEmail(user.getEmail()) != null)
                return new ResponseEntity<>("Already exist!", HttpStatus.OK);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole("ROLE_USER");
            if (userRepo.save(user) != null)
                return new ResponseEntity<>("Sign up successfully", HttpStatus.OK);
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
