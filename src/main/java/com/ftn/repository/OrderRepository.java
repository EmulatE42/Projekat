package com.ftn.repository;

import com.ftn.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

/**
 * Created by Momir on 6/20/2017.
 */
public interface OrderRepository extends JpaRepository<Order,Integer> {

    @Query("SELECT o FROM Order o")
    Set<Order> getOrders();
}
