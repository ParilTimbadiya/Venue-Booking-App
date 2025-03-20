package com.cricboard.repository;

import com.cricboard.dto.ContactUs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactUsRepo extends JpaRepository<ContactUs,Long> {
}
