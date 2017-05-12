package com.ftn.domain;


import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Guest extends User {

    @Column(name = "confirmReg")
    private Boolean confirmReg;


    public Guest(String email, String password, String firstName, String lastName)
    {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.confirmReg = false;
    }
}
