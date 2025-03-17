package com.cricboard.controller;

import com.cricboard.config.jwt.JwtService;
import com.cricboard.model.CartItem;
import com.cricboard.model.Product;
import com.cricboard.model.User;
import com.cricboard.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("crickhero/cart")
public class CartController {

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/items")
    public ResponseEntity<?> getCartItems(@RequestHeader("Authorization") String header) {
        String email = "";
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            email = jwtService.extractUsername(token);
            return new ResponseEntity<>(cartItemService.getCartItemsByUserId(email),HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/update")
    public ResponseEntity<String> updateCartItem(@RequestHeader("product") int productId,@RequestHeader("qty") int qty,@RequestHeader("Authorization") String header) {
        String email = "";
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            email = jwtService.extractUsername(token);
            Product product = new Product();
            product.setId((long) productId);
            User user = new User();

            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQty(qty);
            System.out.println("Received cart item: " + cartItem);
            cartItemService.updateCartItem(email, cartItem);
            return ResponseEntity.ok("Cart item updated successfully");
        } else {
            return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
        }
    }
}
