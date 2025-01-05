package com.sahajinfotech.crickhero.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
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

    public TimeSlot() {
    }

    public Long getTimeSlotId() {
        return timeSlotId;
    }

    public TimeSlot setTimeSlotId(Long timeSlotId) {
        this.timeSlotId = timeSlotId;
        return this;
    }

    public LocalDate getDate() {
        return date;
    }

    public TimeSlot setDate(LocalDate date) {
        this.date = date;
        return this;
    }

    public LocalTime getSlotTime() {
        return slotTime;
    }

    public TimeSlot setSlotTime(LocalTime slotTime) {
        this.slotTime = slotTime;
        return this;
    }

    public boolean isBooked() {
        return isBooked;
    }

    public TimeSlot setBooked(boolean booked) {
        isBooked = booked;
        return this;
    }

    public Venue getVenue() {
        return venue;
    }

    public TimeSlot setVenue(Venue venue) {
        this.venue = venue;
        return this;
    }

    @Override
    public String toString() {
        return "TimeSlot{" +
                "timeSlotId=" + timeSlotId +
                ", date=" + date +
                ", slotTime=" + slotTime +
                ", isBooked=" + isBooked +
                '}';
    }
}
