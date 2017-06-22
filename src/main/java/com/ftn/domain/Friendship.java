package com.ftn.domain;
import com.ftn.service.FriendsService;

import javax.persistence.*;

/**
 * Created by EmulatE on 21-Jun-17.
 */
@Entity
@Table(name = "friendship")
public class Friendship {
    @Id
    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;


    @Column(name = "koSalje", nullable = false) // email od onog ko je poslao

    private String koSalje;

    @Column(name = "komeSeSalje", nullable = false) // email od onog ko je primio
    private String komeSeSalje;
    // dodaj obe varijante u bazu
    public Friendship() {}

    public Friendship(String emailPrvog, String emailDrugog)
    {
        this.koSalje = emailPrvog;
        this.komeSeSalje = emailDrugog;
    }
    public String getEmailPrvog()
    {
        return this.koSalje;
    }

    public String getEmailDrugog()
    {
        return this.komeSeSalje;
    }
    public void setEmailPrvog(String t)
    {
        this.koSalje = t;
    }
    public void setEmailDrugog(String t)
    {
        this.komeSeSalje = t;
    }

}