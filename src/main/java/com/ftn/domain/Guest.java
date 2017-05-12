package com.ftn.domain;


public class Guest extends User {

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
