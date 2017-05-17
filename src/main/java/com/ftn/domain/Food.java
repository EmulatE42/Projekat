package com.ftn.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by Bane on 17/5/2017.
 */
@Entity
@Table(name = "food")
public class Food {
    @Column(name = "name", nullable =false)
    private  String name;

    @Column(name = "description")
    private String foodDescription;

    @Column(name = "price")
    private double price;

    public Food(String name, String desc, double price){
        this.name=name;
        this.foodDescription=desc;
        this.price=price;
    }
    public double getPrice() {
        return price;
    }

    public String getFoodDescription() {
        return foodDescription;
    }

    public String getName() {
        return name;
    }

    public void setFoodDescription(String foodDescription) {
        this.foodDescription = foodDescription;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
