package com.ftn.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * Created by Momir on 5/16/2017.
 */

@Entity
@Table(name = "cook")
public class Cook extends User {

    @Column(name = "birth" , unique = false, nullable = false)
    private Date birth;

    @Column(name = "dressSize" , unique = false, nullable = false)
    private int dressSize;

    @Column(name = "shoeSize" , unique = false, nullable = false)
    private int shoeSize;

    public Cook() {}


    public Cook(String first_name, String last_name, String email, String password, Date birth, int dressSize, int shoeSize) {
        super(first_name, last_name, email, password);
        this.birth = birth;
        this.dressSize = dressSize;
        this.shoeSize = shoeSize;
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
}
