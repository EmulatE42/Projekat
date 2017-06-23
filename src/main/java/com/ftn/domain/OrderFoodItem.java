package com.ftn.domain;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by Momir on 6/20/2017.
 */
@Entity
@Table(name = "order_food_item")
public class OrderFoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "order_food_id" , unique = true, nullable = false)
    private Integer id;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "orderFoodItem")
    private Set<Food> foods;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "user_id", name = "order_cook")
    private Cook cook;

    @Column(name = "nazivRestorana" , nullable = false)
    private String nazivRestorana;

    public OrderFoodItem()
    {

    }

    public OrderFoodItem(Set<Food> foods, String nazivRestorana) {
        this.foods = foods;
        this.nazivRestorana = nazivRestorana;

    }

    public Integer getId() {
        return id;
    }

    public Set<Food> getFoods() {
        return foods;
    }

    public Cook getCook() {
        return cook;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setFoods(Set<Food> foods) {
        this.foods = foods;
    }

    public void setCook(Cook cook) {
        this.cook = cook;
    }
}
