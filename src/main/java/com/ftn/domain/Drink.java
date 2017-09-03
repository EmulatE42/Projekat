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

    @OneToMany(mappedBy = "drink")
    private Set<Order_Drink> order_drinks;

    public Drink(){ order_drinks = new HashSet<>();}

    public Drink(String name, String drinkDescription, double price) {
        this();
        this.name = name;
        this.drinkDescription = drinkDescription;
        this.price = price;
    }

    public Drink(String name, String drinkDescription, double price, HashSet<Order_Drink> order) {
        this.name = name;
        this.drinkDescription = drinkDescription;
        this.price = price;
        this.order_drinks = order;
    }

    public double getPrice() {
        return price;
    }


    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Integer getId() {
        return id;
    }

    public String getDrinkDescription() {
        return drinkDescription;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setDrinkDescription(String drinkDescription) {
        this.drinkDescription = drinkDescription;
    }
}
