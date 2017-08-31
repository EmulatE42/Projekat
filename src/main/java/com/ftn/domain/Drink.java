package com.ftn.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Bane on 17/5/2017.
 */

@Entity
@Table(name = "drink")
public class Drink {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "drink_id" , unique = true, nullable = false)
    private Integer id;

    @Column(name = "name", unique = true,nullable =false)
    private  String name;

    @Column(name = "description")
    private String drinkDescription;

    @Column(name = "price")
    private double price;

    @ManyToMany()
    @JoinTable(name="ORDER_DRINK",
            joinColumns = {@JoinColumn(name = "drink_id")}, inverseJoinColumns = {@JoinColumn(name = "id")})
    private Set<Order> order;

    public Drink(){ order = new HashSet<>();}

    public Drink(String name, String drinkDescription, double price) {
        this.name = name;
        this.drinkDescription = drinkDescription;
        this.price = price;
    }

    public Drink(String name, String drinkDescription, double price, HashSet<Order> order) {
        this.name = name;
        this.drinkDescription = drinkDescription;
        this.price = price;
        this.order = order;
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
