package com.cricboard.repository;

import com.cricboard.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Orders,Long> {
    public List<Orders> findAllByEmail(String email);
}
