package com.ftn.domain;

/**
 * Created by Momir on 02-Sep-17.
 */
import org.aspectj.weaver.ast.Or;

import javax.persistence.*;

@Entity
@Table(name = "order_drink")
public class Order_Drink {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "order_drink_id")
    private Integer order_drink_id;


    @ManyToOne()
    @JoinColumn(name = "id")
    private Order order;

    @ManyToOne()
    @JoinColumn(name = "drink_id")
    private Drink drink;

    @Column(name = "ready" , nullable = true)
    private boolean ready;

    public Order_Drink()
    {

    }

    public Order_Drink(Order order, Drink drink) {
        this.order = order;
        this.drink = drink;
    }

    public Order getOrder() {
        return order;
    }

    public Drink getDrink() {
        return drink;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public void setDrink(Drink drink) {
        this.drink = drink;
    }

    public boolean isReady() {
        return ready;
    }

    public void setReady(boolean ready) {
        this.ready = ready;
    }

    public Integer getOrder_drink_id() {
        return order_drink_id;
    }

    public void setOrder_drink_id(Integer order_drink_id) {
        this.order_drink_id = order_drink_id;
    }
}

