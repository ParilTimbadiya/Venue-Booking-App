package com.cricboard.repository;

import com.cricboard.model.ProductItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductItemsRepo extends JpaRepository<ProductItems,Long> {
    public List<ProductItems> findAllByOrderId(Long orderId);
}
