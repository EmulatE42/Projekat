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

    public Integer getId() {
        return order_food_id;
    }

    public void setId(Integer id) {
        this.order_food_id = id;
    }

    @ManyToOne()
    @JoinColumn(name = "id")
    private Order order;

    @ManyToOne()
    @JoinColumn(name = "food_id")
    private Food food;

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
}
