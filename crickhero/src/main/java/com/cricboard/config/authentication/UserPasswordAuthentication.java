package com.cricboard.config.authentication;

import com.cricboard.exception.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserPasswordAuthentication implements AuthenticationProvider {
    @Autowired
    @Qualifier("userDetailsService")
    UserDetailsService userDetailsService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UserDetails userDetails = userDetailsService.loadUserByUsername(authentication.getName());
        if (userDetails != null) {
            if (passwordEncoder.matches((CharSequence) authentication.getCredentials(), userDetails.getPassword())) {
                return new UsernamePasswordAuthenticationToken(userDetails.getUsername(), null, userDetails.getAuthorities());
            }
            throw new CustomException("Wrong Password");
        }
        throw new CustomException("User not found!");
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

    public UserPasswordAuthentication() {
    }
}
