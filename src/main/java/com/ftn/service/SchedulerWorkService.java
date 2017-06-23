package com.ftn.service;


import com.ftn.domain.SchedulerWork;

/**
 * Created by Momir on 6/23/2017.
 */
public interface SchedulerWorkService {

    SchedulerWork findByUserID(Integer id);
}
