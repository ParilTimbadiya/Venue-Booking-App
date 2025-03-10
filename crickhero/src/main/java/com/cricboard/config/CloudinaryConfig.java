package com.cricboard.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dq4j4eswv");
        config.put("api_key", "524253781417491");
        config.put("api_secret", "rxXK1qtM5B6H1mtuayWXgJVHNqs");
        return new Cloudinary(config);
    }
}
