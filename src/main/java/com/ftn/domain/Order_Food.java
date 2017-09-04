package com.ftn.domain;

/**
 * Created by EmulatE on 30-Aug-17.
 */
import org.aspectj.weaver.ast.Or;

import javax.persistence.*;

@Entity
@Table(name = "order_food")
public class Order_Food {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "order_food_id")
    private Integer order_food_id;



    @ManyToOne()
    @JoinColumn(name = "id")
    private Order order;

    @ManyToOne()
    @JoinColumn(name = "food_id")
    private Food food;

    @Column(name = "accept" , nullable = true)
    private boolean accept;

    @Column(name = "ready" , nullable = true)
    private boolean ready;

    public Order_Food()
    {

    }

    public Order_Food(Order order, Food food) {
        this.order = order;
        this.food = food;
    }

    public Order getOrder() {
        return order;
    }

    public Food getFood() {
        return food;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public void setFood(Food food) {
        this.food = food;
    }

    public boolean isAccept() {
        return accept;
    }

    public boolean isReady() {
        return ready;
    }

    public void setAccept(boolean accept) {
        this.accept = accept;
    }

    public void setReady(boolean ready) {
        this.ready = ready;
    }

    public Integer getOrder_food_id() {
        return order_food_id;
    }

    public void setOrder_food_id(Integer order_food_id) {
        this.order_food_id = order_food_id;
    }
}
