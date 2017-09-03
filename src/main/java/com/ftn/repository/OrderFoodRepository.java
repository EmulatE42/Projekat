package com.ftn.repository;

import com.ftn.domain.Order_Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

/**
 * Created by Momir on 03.09.2017.
 */
public interface OrderFoodRepository extends JpaRepository<Order_Food,Integer> {


}
