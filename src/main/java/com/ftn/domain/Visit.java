package com.ftn.domain;
import javax.persistence.*;

@Entity
@Table(name = "visit")
public class Visit {

    @Id
    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;


    @Column(name = "email", nullable = false) // email od onog ko je posetio

    private String email;

    @Column(name = "nazivRestorana", nullable = false)
    private String nazivRestorana;


    @Column(name = "datum", nullable = false)
    private String datum;

    @Column(name = "ocena", nullable = false)
    private double ocena;

    @Column(name = "gotov", nullable = false)
    private int gotov;

    public Visit() {}

    public Visit(String email, String nazivRestorana, String datum, double ocena, int gotov) {
        this.email = email;
        this.nazivRestorana = nazivRestorana;
        this.datum = datum;
        this.ocena = ocena;
        this.gotov = gotov;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNazivRestorana() {
        return nazivRestorana;
    }

    public void setNazivRestorana(String nazivRestorana) {
        this.nazivRestorana = nazivRestorana;
    }

    public String getDatum() {
        return datum;
    }

    public void setDatum(String datum) {
        this.datum = datum;
    }

    public double getOcena() {
        return ocena;
    }

    public void setOcena(double ocena) {
        this.ocena = ocena;
    }

    public int getGotov() {
        return gotov;
    }

    public void setGotov(int gotov) {
        this.gotov = gotov;
    }
}
