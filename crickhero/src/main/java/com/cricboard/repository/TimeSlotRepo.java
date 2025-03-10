package com.cricboard.repository;

import com.cricboard.model.TimeSlot;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface TimeSlotRepo extends JpaRepository<TimeSlot,Long> {
    @Query(value = "select * from time_slot where fk_venue_id=?1 and date=?2",nativeQuery = true)
    List<TimeSlot> findByVenueIdAndBookingDate(Long venueId, LocalDate bookingDate);

    List<TimeSlot> findAllByDate(LocalDate date);

    @Query(value = "SELECT * FROM time_slot WHERE fk_venue_id = ?1 AND date = ?2 AND slot_time BETWEEN ?3 AND ?4",nativeQuery = true)
    List<TimeSlot> findSlotsBetween(int venueId,LocalDate date, LocalTime startTime, LocalTime endTime);

    @Modifying
    @Transactional
    @Query(value = "delete from time_slot where date < ?1",nativeQuery = true)
    void deleteAllLessThanDate(LocalDate date);
}
