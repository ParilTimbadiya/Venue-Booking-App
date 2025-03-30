package com.cricboard.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long bookingId;

    @Column(nullable = false)
    private LocalDate bookingDate;

    @Column(nullable = false)
    private LocalTime start_time;

    @Column(nullable = false)
    private LocalTime end_time;

    private double total_hours;

    private double total_cost;

    private LocalDateTime created_at = LocalDateTime.now();

    private String upiId;
//    private int pin;
    @ManyToOne
    @JoinColumn(name = "fkVenueId")
    private Venue venue;

    @ManyToOne
    @JoinColumn(name = "fkUserId")
    private User user;

}
