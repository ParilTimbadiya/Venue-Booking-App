package com.cricboard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductItems {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long productItemId;

    private Long orderId;

    private Long productId;

    private Long qty;
}
