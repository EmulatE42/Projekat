package com.ftn.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;
import java.util.Set;
import java.util.List;

/**
 * Created by Momir on 6/20/2017.
 */

@Entity
@Table(name = "t_order")
public class Order implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id" , unique = true, nullable = false)
    private Integer id;

    @JsonIgnore
    @OneToMany(mappedBy = "order", fetch = FetchType.EAGER, cascade = CascadeType.ALL )
    private Set<Order_Food> order_foods;

    @JsonIgnore
    @OneToMany(mappedBy = "order", fetch = FetchType.EAGER, cascade = CascadeType.ALL )
    private Set<Order_Drink> order_drinks;

    @Column(name = "brojStola" , nullable = false)
    @ElementCollection
    private List<Integer> brojStola;

    @Column(name = "nazivRestorana" , nullable = true)
    private String nazivRestorana;

    @Column(name = "vreme" , nullable = true)
    private String vreme;

    public Order()
    {

    }

    public Order(Set<Order_Food> order_foods, Set<Order_Drink> order_drinks, List<Integer> brojStola, String nazivRestorana, String vreme) {
        this.order_foods = order_foods;
        this.order_drinks = order_drinks;
        this.brojStola = brojStola;
        this.nazivRestorana = nazivRestorana;
        this.vreme = vreme;
    }

    public Integer getId() {
        return id;
    }

    public Set<Order_Food> getOrder_foods() {
        return order_foods;
    }

    public List<Integer> getBrojStola() {
        return brojStola;
    }

    public String getNazivRestorana() {
        return nazivRestorana;
    }

    public String getVreme() {
        return vreme;
    }

    public Set<Order_Drink> getOrder_drinks() {
        return order_drinks;
    }
}
