package com.cricboard.repository;

import com.cricboard.model.ProductItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductItemsRepo extends JpaRepository<ProductItems,Long> {
}
