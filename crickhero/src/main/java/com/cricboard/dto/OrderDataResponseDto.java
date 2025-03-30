package com.cricboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDataResponseDto {
        private Long orderId;
        private String fullName;
        private String email;
        private String phone;
        private String address;
        private String paymentMethod;
        private List<ProductDto> orderItems; // List of product IDs
        private double totalAmount;
}
