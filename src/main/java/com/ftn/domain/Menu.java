package com.ftn.domain;

import javax.persistence.*;
import java.util.ArrayList;

/**
 * Created by Bane on 17/5/2017.
 */
@Entity
@Table(name = "menu")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "id" , unique = true, nullable = false)
    private Integer id;

    @Column(name = "foods")
    private ArrayList<Food> foods;

    public Menu(){
        foods = new ArrayList<>();
    }
    public ArrayList<Food> getFoods(){
        return foods;
    }
    public void setFoods(ArrayList<Food> f){
        this.foods=f;
    }
}
