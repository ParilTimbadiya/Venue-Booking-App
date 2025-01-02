package com.sahajinfotech.crickhero.repository;

import com.sahajinfotech.crickhero.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VenueRepo extends JpaRepository<Venue,Integer> {
}
