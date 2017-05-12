package com.ftn.domain;

import javax.persistence.*;

import static javax.persistence.InheritanceType.TABLE_PER_CLASS;

@Entity
@Inheritance(strategy=TABLE_PER_CLASS)

public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "user_id")
    protected Long id;

    @Column(name = "email", unique = true, nullable = false)

    protected String email;

    @Column(name = "password")
    protected String password;

    @Column(name = "first_name")

    protected String firstName;

    @Column(name = "last_name")

    protected String lastName;

}