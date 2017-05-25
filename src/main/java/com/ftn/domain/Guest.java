package com.ftn.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "guest")
public class Guest extends User {

    @Column(name = "enabled")
    private boolean enabled;
    @Column(name = "adresa")
    private String adresa;
    public Guest()
    {

    }

    public Guest(String first_name, String last_name, String email, String password, Role role, boolean enabled,String adresa) {
        super(first_name, last_name, email, password, role);
        this.enabled = false;
        this.adresa = adresa;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean online) {
        //System.out.println("EHREEEEEEEEEE POSTAAVIOOOOOO"); this.enabled = online;
    }
    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String s) {
        this.adresa = s;
    }
}
