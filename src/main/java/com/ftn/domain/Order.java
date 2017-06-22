package com.ftn.domain;

import javax.persistence.*;
import java.util.Set;
import java.util.Set;

/**
 * Created by Momir on 6/20/2017.
 */

@Entity
@Table(name = "t_order")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "id" , unique = true, nullable = false)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "order_drink_id", name = "drink")
    private OrderDrinkItem orderDrinkItem;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "order_food_id", name = "food")
    private OrderFoodItem orderFoodItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "user_id", name = "order_waiter")
    private Waiter waiter;


    public Order()
    {

    }


}
