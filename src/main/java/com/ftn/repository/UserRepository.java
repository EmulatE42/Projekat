package com.ftn.repository;

import com.ftn.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by EmulatE on 10-May-17.
 */
public interface UserRepository extends JpaRepository<User,Integer> {
    //User findB
}
