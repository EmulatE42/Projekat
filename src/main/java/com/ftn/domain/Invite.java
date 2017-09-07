package com.ftn.domain;

import javax.persistence.*;

/**
 * Created by EmulatE on 07-Sep-17.
 */
@Entity
@Table(name = "invite")
public class Invite {
    @Id
    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @Column(name = "poslao", nullable = false)

    private String poslao;

    @Column(name = "primio", nullable = false)
    private String primio;

    @Column(name = "imeRestorana", nullable = false)
    private String imeRestorana;

    @Column(name = "datum", nullable = false)
    private String datum;

    @Column(name = "idPorudzbine", nullable = false)
    private Integer idPorudzbine;

    public Invite()
    {

    }

    public Invite(String poslao, String primio, String imeRestorana, String datum, Integer idPorudzbine) {
        this.poslao = poslao;
        this.primio = primio;
        this.imeRestorana = imeRestorana;
        this.datum = datum;
        this.idPorudzbine = idPorudzbine;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPoslao() {
        return poslao;
    }

    public void setPoslao(String poslao) {
        this.poslao = poslao;
    }

    public String getPrimio() {
        return primio;
    }

    public void setPrimio(String primio) {
        this.primio = primio;
    }

    public String getImeRestorana() {
        return imeRestorana;
    }

    public void setImeRestorana(String imeRestorana) {
        this.imeRestorana = imeRestorana;
    }

    public String getDatum() {
        return datum;
    }

    public void setDatum(String datum) {
        this.datum = datum;
    }

    public Integer getIdPorudzbine() {
        return idPorudzbine;
    }

    public void setIdPorudzbine(Integer idPorudzbine) {
        this.idPorudzbine = idPorudzbine;
    }
}
