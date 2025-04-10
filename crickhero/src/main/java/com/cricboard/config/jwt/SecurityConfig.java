package com.cricboard.config.jwt;

import com.cricboard.config.authentication.UserPasswordAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * SecurityConfig - Main security configuration class
 * 
 * This class configures Spring Security settings including:
 * - JWT authentication
 * - Role-based access control
 * - Password encoding
 * - Session management
 * - CORS and CSRF protection
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private JwtFilter jwtFilter;
    
    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * Configures the security filter chain
     * 
     * @param http HttpSecurity object to configure security settings
     * @return Configured SecurityFilterChain
     * @throws Exception if configuration fails
     * 
     * Security Features:
     * - Disables CSRF protection (for API usage)
     * - Enables CORS support
     * - Configures role-based access control:
     *   - ROLE_USER required for booking venues
     *   - ROLE_ADMIN required for adding venues
     *   - Public access for signup, signin, and venue listing
     * - Enables stateless session management
     * - Adds JWT filter before username/password authentication
     */
    @Bean
    public SecurityFilterChain SecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(customizer -> customizer.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/crickhero/auth/addvenue","/crickhero/auth/bookvenue").hasAuthority("ROLE_USER")
                        .requestMatchers("/crickhero/auth/addvenue").hasAuthority("ROLE_ADMIN")
                        .requestMatchers("/crickhero/signup","/crickhero/signin","/crickhero/send-otp","/crickhero/reset-password","/crickhero/venuelist","/crickhero/removevenuelist","/crickhero/productlist","/crickhero/contact","/crickhero/addequipment","/crickhero/place-order","/crickhero/cart/items","/crickhero/cart/update","/crickhero/booking-data","/crickhero/order-data","/crickhero/users","/crickhero/merchantdetails","/crickhero/make-merchant","/crickhero/generate-qr","/crickhero/accept-merchant-request","/crickhero/reject-merchant-request","/crickhero/merchant-requests","/crickhero/cancel-booking","/crickhero/become-merchant","/crickhero/shipped-order","/crickhero/productfetch/","/crickhero/removeProduct/","/crickhero/delivered-order","/crickhero/expire","/crickhero/merchantPayment").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .anyRequest().authenticated())
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    /**
     * Configures the password encoder
     * 
     * @return BCryptPasswordEncoder instance for secure password hashing
     */
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    /**
     * Configures the authentication provider
     * 
     * @return Custom UserPasswordAuthentication provider
     */
    @Bean
    public AuthenticationProvider authenticationProvider(){
        return new UserPasswordAuthentication();
    }

    /**
     * Configures the authentication manager
     * 
     * @param configuration AuthenticationConfiguration instance
     * @return AuthenticationManager instance
     * @throws Exception if configuration fails
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
