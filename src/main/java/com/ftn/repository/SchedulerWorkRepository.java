package com.ftn.repository;

import com.ftn.domain.Restaurant;
import com.ftn.domain.SchedulerWork;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Momir on 6/23/2017.
 */
public interface SchedulerWorkRepository extends JpaRepository<SchedulerWork, Integer> {

    SchedulerWork findByUserID(Integer userId);
}
