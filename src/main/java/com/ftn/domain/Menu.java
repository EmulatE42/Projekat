package com.ftn.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.ArrayList;

/**
 * Created by Bane on 17/5/2017.
 */
@Entity
@Table(name = "menu")
public class Menu {

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
