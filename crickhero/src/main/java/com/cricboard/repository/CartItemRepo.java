package com.cricboard.repository;

import com.cricboard.model.CartItem;
import com.cricboard.model.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CartItemRepo extends JpaRepository<CartItem,Long> {
    @Query(value = "SELECT * FROM cart_item WHERE fk_user_id = :userId", nativeQuery = true)
    List<CartItem> findCartItemsByUserId(@Param("userId") int userId);

    @Query(value = "SELECT * FROM cart_item WHERE fk_user_id = :userId and fk_product_id = :productId", nativeQuery = true)
    List<CartItem> findUserWithProduct(@Param("userId") int userId,@Param("productId") long productId);

}
