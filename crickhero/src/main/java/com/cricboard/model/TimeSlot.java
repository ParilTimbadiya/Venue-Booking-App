package com.cricboard.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TimeSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long timeSlotId;
    @Column(nullable = false)
    private LocalDate date;
    @Column(nullable = false)
    private LocalTime slotTime;
    @Column(nullable = false)
    private boolean isBooked;
    @ManyToOne
    @JoinColumn(name = "fkVenueId")
    private Venue venue;
}
