package com.cricboard.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int venueId;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String Address;

    private String merchantEmail;

    private boolean isShow;

    private final LocalDateTime localDateTime = LocalDateTime.now();

    @OneToMany(mappedBy = "venue",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Booking> bookingList;

    @OneToMany(mappedBy = "venue",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<TimeSlot> timeSlots;

    public void setShow(boolean show) {
        isShow = show;
    }
}
