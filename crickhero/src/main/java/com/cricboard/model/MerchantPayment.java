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
public class MerchantPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long merchantPaymentId;
    private int months;
    private String email;
    private double totalAmount;
    private String debitCardNumber;
    private String pin;
}
