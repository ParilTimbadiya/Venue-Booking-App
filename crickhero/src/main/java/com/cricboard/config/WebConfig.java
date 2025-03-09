package com.cricboard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * WebConfig - Configuration class for web-related settings
 * 
 * This class handles Cross-Origin Resource Sharing (CORS) configuration
 * to allow communication between the frontend and backend applications.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    /**
     * Configures CORS settings for the application
     * 
     * @param registry CorsRegistry object to configure CORS mappings
     * 
     * Configuration Details:
     * - Allows requests from frontend origin (http://localhost:5173)
     * - Permits GET, POST, PUT, DELETE, and OPTIONS methods
     * - Allows all headers
     * - Enables credentials support
     * - Applies to all endpoints (/**)
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:55000") // Frontend origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
