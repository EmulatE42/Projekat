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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id" , unique = true, nullable = false)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "order_drink_id", name = "drink")
    private OrderDrinkItem orderDrinkItem;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "order_food_id", name = "food")
    private OrderFoodItem orderFoodItem;

    @Column(name = "brojStola" , nullable = false)
    private Integer brojStola;

    @Column(name = "nazivRestorana" , nullable = false)
    private String nazivRestorana;

    public Order()
    {

    }


}
