package com.cricboard.repository;

import com.cricboard.model.CartItem;
import com.cricboard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User,Integer> {
    public User findByEmail(String email);
    @Query(value = "SELECT * FROM tbluser WHERE is_merchant = True", nativeQuery = true)
    List<User> findAllMerchantUser();

    @Query(value = "SELECT * FROM tbluser WHERE merchant_request = True", nativeQuery = true)
    List<User> findAllMerchantRequestUser();
}
