package com.ftn.service.implementation;

import com.ftn.domain.Visit;
import com.ftn.repository.VisitRepository;
import com.ftn.service.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by EmulatE on 23-Jun-17.
 */
@Service
public class VisitServiceImpl implements VisitService {

    @Autowired
    private VisitRepository visitRepository;


    @Override
    public Visit save(Visit f) {
        return visitRepository.save(f);
    }

    @Override
    public List<Visit> getVisitsByEmail(String ko) {
        return visitRepository.findVisitsByEmail(ko);
    }
}
