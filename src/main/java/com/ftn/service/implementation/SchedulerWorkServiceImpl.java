package com.ftn.service.implementation;


import com.ftn.domain.SchedulerWork;
import com.ftn.repository.SchedulerWorkRepository;
import com.ftn.repository.UserRepository;
import com.ftn.service.SchedulerWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Djuragic on 6/23/2017.
 */
@Service
public class SchedulerWorkServiceImpl implements SchedulerWorkService{

    @Autowired
    private SchedulerWorkRepository schedulerWorkRepository;

    @Override
    public SchedulerWork findByUserID(Integer id) {
        SchedulerWork sw = schedulerWorkRepository.findByUserID(id);
        return sw;
    }
}
