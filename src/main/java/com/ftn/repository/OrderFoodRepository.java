package com.ftn.repository;

import com.ftn.domain.Order_Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

/**
 * Created by Momir on 03.09.2017.
 */
public interface OrderFoodRepository extends JpaRepository<Order_Food,Integer> {

    @Modifying
    @Transactional
    @Query("Update Order_Food order_food SET order_food.ready=true WHERE order_food.order_food_id=:id")
    void updateReady(@Param("id") int id);

    @Modifying
    @Transactional
    @Query("Update Order_Food order_food SET order_food.accept=true WHERE order_food.order_food_id=:id")
    void updateAccept(@Param("id") int id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Order_Food order_food WHERE order_food.id=:id")
    void delteOrderFoods(@Param("id") int id);
}
