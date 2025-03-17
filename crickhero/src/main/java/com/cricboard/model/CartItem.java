package com.cricboard.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cartItemId;

    private int qty;

    @ManyToOne
    @JoinColumn(name = "fkUserId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "fkProductId")
    private Product product;

}
