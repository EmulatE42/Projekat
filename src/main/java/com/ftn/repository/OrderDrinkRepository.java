package com.ftn.repository;

import com.ftn.domain.Order;
import com.ftn.domain.Order_Drink;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Momir on 03.09.2017.
 */
public interface OrderDrinkRepository extends JpaRepository<Order_Drink, Integer> {

    @Modifying
    @Transactional
    @Query("Update Order_Drink order_drink SET order_drink.ready=true WHERE order_drink.order_drink_id=:id")
    void updateReady(@Param("id") int id);

}
