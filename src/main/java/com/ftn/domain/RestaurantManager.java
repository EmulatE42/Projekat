package com.ftn.domain;

import javax.persistence.*;

/**
 * Created by Bane on 15/5/2017.
 */
@Entity
@Table(name = "restaurantManager")
public class RestaurantManager extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "id" , unique = true, nullable = false)
    private Integer id;
     //Metode

}
