package com.ftn.domain;

import javax.persistence.*;

/**
 * Created by Bane on 17/5/2017.
 */

@Entity
@Table(name = "drink")
public class Drink {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "id" , unique = true, nullable = false)
    private Integer id;

    @Column(name = "name", unique = true,nullable =false)
    private  String name;

    @Column(name = "description")
    private String drinkDescription;

    @Column(name = "price")
    private double price;

    public Drink(String name, String desc, double price){
        this.name=name;
        this.drinkDescription=desc;
        this.price=price;
    }
    public double getPrice() {
        return price;
    }

    public String getFoodDescription() {
        return drinkDescription;
    }

    public String getName() {
        return name;
    }

    public void setFoodDescription(String foodDescription) {
        this.drinkDescription = foodDescription;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
