package com.sahajinfotech.crickhero.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
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

    @ManyToOne
    @JoinColumn(name = "fkVenueId")
    private Venue venue;

    @ManyToOne
    @JoinColumn(name = "fkUserId")
    private User user;

    public Venue getVenue() {
        return venue;
    }

    public Booking setVenue(Venue venue) {
        this.venue = venue;
        return this;
    }

    public User getUser() {
        return user;
    }

    public Booking setUser(User user) {
        this.user = user;
        return this;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public Booking setBookingId(Long bookingId) {
        this.bookingId = bookingId;
        return this;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public Booking setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
        return this;
    }

    public LocalTime getStart_time() {
        return start_time;
    }

    public Booking setStart_time(LocalTime start_time) {
        this.start_time = start_time;
        return this;
    }

    public LocalTime getEnd_time() {
        return end_time;
    }

    public Booking setEnd_time(LocalTime end_time) {
        this.end_time = end_time;
        return this;
    }

    public double getTotal_hours() {
        return total_hours;
    }

    public Booking setTotal_hours(double total_hours) {
        this.total_hours = total_hours;
        return this;
    }

    public double getTotal_cost() {
        return total_cost;
    }

    public Booking setTotal_cost(double total_cost) {
        this.total_cost = total_cost;
        return this;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public Booking() {
    }
}
