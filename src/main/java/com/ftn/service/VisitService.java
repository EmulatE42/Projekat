package com.ftn.service;

import com.ftn.domain.Visit;

import java.util.List;

/**
 * Created by EmulatE on 23-Jun-17.
 */
public interface VisitService {

    Visit save(Visit f);

    List<Visit> getVisitsByEmail(String ko);
    List<Visit> getAll();
    void updateVisit(int id,double ocena);
}
