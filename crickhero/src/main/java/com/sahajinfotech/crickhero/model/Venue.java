package com.sahajinfotech.crickhero.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
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

    private final LocalDateTime localDateTime = LocalDateTime.now();

    @OneToMany(mappedBy = "venue",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Booking> bookingList;

    @OneToMany(mappedBy = "venue",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<TimeSlot> timeSlots;

    public List<Booking> getBookingList() {
        return bookingList;
    }

    public Venue setBookingList(List<Booking> bookingList) {
        this.bookingList = bookingList;
        return this;
    }

    public List<TimeSlot> getTimeSlots() {
        return timeSlots;
    }

    public Venue setTimeSlots(List<TimeSlot> timeSlots) {
        this.timeSlots = timeSlots;
        return this;
    }

    @Override
    public String toString() {
        return "Venue{" +
                "venueId=" + venueId +
                ", imageUrl='" + imageUrl + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", Address='" + Address + '\'' +
                ", localDateTime=" + localDateTime +
                '}';
    }

    public String getCity() {
        return city;
    }

    public Venue setCity(String city) {
        this.city = city;
        return this;
    }

    public String getState() {
        return state;
    }

    public Venue setState(String state) {
        this.state = state;
        return this;
    }

    public String getAddress() {
        return Address;
    }

    public Venue setAddress(String address) {
        Address = address;
        return this;
    }

    public LocalDateTime getLocalDateTime() {
        return localDateTime;
    }

    public int getVenueId() {
        return venueId;
    }

    public Venue setVenueId(int venueId) {
        this.venueId = venueId;
        return this;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Venue setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public String getName() {
        return name;
    }

    public Venue setName(String name) {
        this.name = name;
        return this;
    }

    public int getPrice() {
        return price;
    }

    public Venue setPrice(int price) {
        this.price = price;
        return this;
    }

    public Venue(int venueId, String imageUrl, String name, int price, String city, String state, String address) {
        this.venueId = venueId;
        this.imageUrl = imageUrl;
        this.name = name;
        this.price = price;
        this.city = city;
        this.state = state;
        Address = address;
    }

    public Venue() {
    }
}
