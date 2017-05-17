package com.ftn.domain;

import javax.persistence.*;

/**
 * Created by Bane on 17/5/2017.
 */
@Entity
@Table(name = "supplier")
public class Supplier extends User {
   //metode
   @Id
   @GeneratedValue(strategy = GenerationType.TABLE)
   @Column(name = "id" , unique = true, nullable = false)
   private Integer id;

}
