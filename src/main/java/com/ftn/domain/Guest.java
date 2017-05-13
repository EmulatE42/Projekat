package com.ftn.domain;

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

    public Guest(String first_name, String last_name, String email, String password, boolean online) {
        super(first_name, last_name, email, password);
        this.online = online;
    }

    public boolean isOnline() {
        return online;
    }

    public void setOnline(boolean online) {
        this.online = online;
    }
}
