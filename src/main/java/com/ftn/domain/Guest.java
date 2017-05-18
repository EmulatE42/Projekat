package com.ftn.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "guest")
public class Guest extends User {

    @Column(name = "online")
    private boolean online;

    public Guest()
    {

    }

    public Guest(String first_name, String last_name, String email, String password, Role role, boolean online) {
        super(first_name, last_name, email, password, role);
        this.online = online;
    }

    public boolean isOnline() {
        return online;
    }

    public void setOnline(boolean online) {
        this.online = online;
    }
}
