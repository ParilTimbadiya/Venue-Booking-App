package com.cricboard.config.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JwtFilter - JWT Authentication Filter
 * 
 * This filter intercepts incoming requests to validate JWT tokens
 * and set up Spring Security authentication context.
 */
@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private ApplicationContext context;
    
    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * Processes each request to validate JWT token
     * 
     * @param request HttpServletRequest object
     * @param response HttpServletResponse object
     * @param filterChain FilterChain to continue processing
     * @throws ServletException if servlet error occurs
     * @throws IOException if I/O error occurs
     * 
     * Process Flow:
     * 1. Extracts JWT token from Authorization header
     * 2. Validates token and extracts username
     * 3. Loads user details if token is valid
     * 4. Sets up Spring Security authentication context
     * 5. Continues filter chain processing
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
            throws ServletException, IOException {
        String token = null;
        String username = null;

        // Extract token from Authorization header
        String header = request.getHeader("Authorization");
        if(header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            username = jwtService.extractUsername(token);
        }

        // Validate token and set up authentication if valid
        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = context.getBean(UserDetailServiceImplementation.class)
                                          .loadUserByUsername(username);
            if(jwtService.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = 
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Continue filter chain processing
        filterChain.doFilter(request, response);
    }
}
