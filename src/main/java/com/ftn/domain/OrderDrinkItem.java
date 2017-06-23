package com.ftn.domain;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by Momir on 6/20/2017.
 */
@Entity
@Table(name = "order_drink_item")
public class OrderDrinkItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "order_drink_id" , unique = true, nullable = false)
    private Integer id;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "orderDrinkItem")
    private Set<Drink> drinks;

    @ManyToOne()
    @JoinColumn(referencedColumnName = "user_id", name = "order_bartender")
    private Bartender bartender;

    @Column(name = "nazivRestorana" , nullable = false)
    private String nazivRestorana;

    public OrderDrinkItem()
    {

    }

    public OrderDrinkItem(Set<Drink> drinks , String nazivRestorana) {
        this.drinks = drinks;
        this.nazivRestorana = nazivRestorana;
    }

    public Integer getId() {
        return id;
    }

    public Set<Drink> getDrinks() {
        return drinks;
    }

    public Bartender getBartender() {
        return bartender;
    }

    public String getNazivRestorana() {return nazivRestorana;}

    public void setId(Integer id) {
        this.id = id;
    }

    public void setDrinks(Set<Drink> drinks) {
        this.drinks = drinks;
    }

    public void setBartender(Bartender bartender) {
        this.bartender = bartender;
    }
}
