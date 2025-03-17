package com.cricboard.service;

import com.cricboard.model.CartItem;
import com.cricboard.model.Product;
import com.cricboard.model.User;
import com.cricboard.repository.CartItemRepo;
import com.cricboard.repository.ProductRepo;
import com.cricboard.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartItemService {
    @Autowired
    CartItemRepo cartItemRepo;
    @Autowired
    UserRepo userRepo;
    @Autowired
    ProductRepo productRepo;
    public ResponseEntity<?> getCartItemsByUserId(String email) {
        try{
            User user = userRepo.findByEmail(email);
            if(user==null)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            List<CartItem> cartItemList = cartItemRepo.findCartItemsByUserId(user.getUserId());
            for (CartItem i : cartItemList){
                i.getUser().setCartItemList(null);
                i.getUser().setBookingList(null);
                i.getUser().setPassword(null);
                i.getUser().setEmail(null);
//
                i.getProduct().setCartItemList(null);
            }
            return new ResponseEntity<>(cartItemList,HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> updateCartItem(String email,CartItem cartItem) {
        try{
            User user = userRepo.findByEmail(email);
            if(user==null)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<CartItem> oldCartItem =  cartItemRepo.findUserWithProduct(user.getUserId(),cartItem.getProduct().getId());
            if(oldCartItem.size()>0){
                CartItem temp = oldCartItem.getFirst();
                temp.setQty(cartItem.getQty());
                cartItem = temp;
            }

            User tempUser = new User();
            tempUser.setUserId(user.getUserId());
            cartItem.setUser(tempUser);
            user.getCartItemList().add(cartItem);

            Product product = productRepo.findById(cartItem.getProduct().getId()).get();
            product.getCartItemList().add(cartItem);


            if(userRepo.save(user) != null && productRepo.save(product) != null){
                return new ResponseEntity<>(HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }

        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
