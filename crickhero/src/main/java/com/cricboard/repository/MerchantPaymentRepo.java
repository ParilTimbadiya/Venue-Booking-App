package com.cricboard.repository;

import com.cricboard.model.MerchantPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestHeader;

@Repository
public interface MerchantPaymentRepo extends JpaRepository<MerchantPayment,Long> {
}
