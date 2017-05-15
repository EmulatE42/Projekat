package com.ftn.domain;

import javax.persistence.*;

/**
 * Created by Momir on 5/14/2017.
 */

@Entity
@Table(name = "restaurant")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "id" , unique = true, nullable = false)
    private Integer id;

    @Column(name = "name" , unique = true, nullable = false)
    private String name;

    @Column(name = "distance" , unique = true, nullable = false)
    private int distance;

    @Column(name = "rating" , unique = true, nullable = false)
    private double rating;

    @Column(name = "friendRating" , unique = true, nullable = false)
    private double friendRating;

    @Column(name = "reservation" , unique = true, nullable = false)
    private boolean reservation;

    public Restaurant() {}

    public Restaurant(String name, int distance, double rating, double friendRating, boolean reservation) {
        this.name = name;
        this.distance = distance;
        this.rating = rating;
        this.friendRating = friendRating;
        this.reservation = reservation;
    }

    public String getName() {
        return name;
    }

    public int getDistance() {
        return distance;
    }

    public double getRating() {
        return rating;
    }

    public double getFriendRating() {
        return friendRating;
    }

    public boolean isReservation() {
        return reservation;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDistance(int distance) {
        this.distance = distance;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public void setFriendRating(double friendRating) {
        this.friendRating = friendRating;
    }

    public void setReservation(boolean reservation) {
        this.reservation = reservation;
    }
}
