package com.ftn.domain;

import javax.persistence.*;

/**
 * Created by EmulatE on 01-Sep-17.
 */
@Entity
@Table(name = "friendrequest")
public class FriendRequest {
    @Id
    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @Column(name = "uputio", nullable = false) // email od onog ko je poslao

    private String uputio;

    @Column(name = "dobio", nullable = false) // email od onog ko je primio
    private String dobio;

    public FriendRequest() {

    }

    public FriendRequest(String uputio, String dobio) {
        this.uputio = uputio;
        this.dobio = dobio;
    }

    public String getUputio() {
        return uputio;
    }

    public void setUputio(String uputio) {
        this.uputio = uputio;
    }

    public String getDobio() {
        return dobio;
    }

    public void setDobio(String dobio) {
        this.dobio = dobio;
    }
}
