package com.cricboard.repository;

import com.cricboard.model.CartItem;
import com.cricboard.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VenueRepo extends JpaRepository<Venue,Integer> {
    @Query(value = "SELECT * FROM venue WHERE merchant_email = :email", nativeQuery = true)
    List<Venue> findAllVenueByMerchantEmail(@Param("email") String email);
}
