package com.ftn.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;



@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "user_id" , unique = true, nullable = false)
    private Integer id;

    @Column(name = "first_name" , unique = false, nullable = false)
    private String first_name;

    @Column(name = "last_name" , unique = false, nullable = false)
    private String last_name;

    @Column(name = "email" , unique = true, nullable = false)
    private String email;

    @Column(name = "password" , unique = false, nullable = false)
    private String password;

    @Column(name = "role" , unique = false, nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private Role role;

    @Column(name = "avatar" , unique = false, nullable = true)
    private String avatar;

    @Column(name = "startTime" , unique = false, nullable = true)
    private String startTime;

    @Column(name = "endTime" , unique = false, nullable = true)
    private String endTime;

    @Column(name = "restaurantName" , unique = false, nullable = true)
    private String restaurantName;

    public User()
    {

    }

    public User(String first_name, String last_name, String email, String password, Role role) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Integer getId() {
        return id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }
}