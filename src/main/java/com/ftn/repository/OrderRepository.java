package com.ftn.repository;

import com.ftn.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

/**
 * Created by Momir on 6/20/2017.
 */
public interface OrderRepository extends JpaRepository<Order,Integer> {

    @Query("SELECT o FROM Order o")
    Set<Order> getOrders();

    @Modifying
    @Transactional
    @Query("Update Order o SET o.ready=true WHERE o.id=:id")
    void updateReady(@Param("id") int id);

    @Modifying
    @Transactional
    @Query("Update Order o SET o.accept=true WHERE o.id=:id")
    void updateAccept(@Param("id") int id);
}
