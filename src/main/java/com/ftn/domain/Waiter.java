package com.ftn.domain;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * Created by Momir on 5/15/2017.
 */

@Entity
@Table(name = "waiter")
public class Waiter extends User{

    @Column(name = "birth" , unique = false, nullable = false)
    private Date birth;

    @Column(name = "dressSize" , unique = false, nullable = false)
    private int dressSize;

    @Column(name = "shoeSize" , unique = false, nullable = false)
    private int shoeSize;

    @Column(name = "firstTimeLogin" , unique = false, nullable = false)
    private boolean firstTimeLogin;


    public Waiter() {}


    public Waiter(String first_name, String last_name, String email, String password, Role role, Date birth, int dressSize, int shoeSize, boolean firstTimeLogin) {
        super(first_name, last_name, email, password, role);
        this.birth = birth;
        this.dressSize = dressSize;
        this.shoeSize = shoeSize;
        this.firstTimeLogin = firstTimeLogin;
    }

    public Date getBirth() {
        return birth;
    }

    public int getDressSize() {
        return dressSize;
    }

    public int getShoeSize() {
        return shoeSize;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public void setDressSize(int dressSize) {
        this.dressSize = dressSize;
    }

    public void setShoeSize(int shoeSize) {
        this.shoeSize = shoeSize;
    }

    public boolean isFirstTimeLogin() {
        return firstTimeLogin;
    }

    public void setFirstTimeLogin(boolean firstTimeLogin) {
        this.firstTimeLogin = firstTimeLogin;
    }

}
