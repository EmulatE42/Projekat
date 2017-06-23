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

    public Visit() {}

    public Visit(String a, String b, String c)
    {
        this.email = a;
        this.nazivRestorana = b;
        this.datum = c;
    }
    public String getEmail()
    {
        return this.email;
    }

    public void setEmail(String t)
    {
        this.email = t;
    }

    public String getNazivRestorana()
    {
        return this.nazivRestorana;
    }

    public void setNazivRestorana(String t)
    {
        this.nazivRestorana = t;
    }

    public String getDatum()
    {
        return this.datum;
    }

    public void setDatum(String t)
    {
        this.datum = t;
    }

}
