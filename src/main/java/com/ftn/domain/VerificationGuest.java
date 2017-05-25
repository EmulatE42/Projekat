package com.ftn.domain;

import javax.persistence.*;
import java.util.UUID;
/**
 * Created by EmulatE on 24-May-17.
 */
@Entity
@Table(name = "verificationguest")
public class VerificationGuest {
    @Id
    @Column(name = "email", unique = true, nullable = false)
   // @GeneratedValue(strategy=GenerationType.AUTO)
    private String email;
    @Column(name = "token", unique = true, nullable = false)
    private String token;
    public VerificationGuest( )
    {

    }

    public VerificationGuest( String email)
    {
        this. email = email;
        this.token = UUID.randomUUID().toString();
    }
    public boolean isGuest(String email)
    {
        if (this.email.equals(email))
            return true;
        return false;
    }
    public String getEmail()
    {
        return this.email;
    }
}