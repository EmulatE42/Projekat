package com.ftn.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Bane on 17/5/2017.
 */
@Entity
@Table(name = "food")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "food_id" , unique = true, nullable = false)
    private Integer id;

    @Column(name = "name", nullable =false)
    private  String name;

    @Column(name = "description")
    private String foodDescription;

    @Column(name = "price")
    private double price;

    @OneToMany(mappedBy = "food")
    private Set<Order_Food> order_foods;


    public Food()
    {
        order_foods = new HashSet<Order_Food>();
    }

    public Food(String name, String foodDescription, double price) {
        this.name = name;
        this.foodDescription = foodDescription;
        this.price = price;
    }

    public Food(String name, String foodDescription, double price, HashSet<Order_Food> order) {
        this.name = name;
        this.foodDescription = foodDescription;
        this.price = price;
        this.order_foods = order;
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
