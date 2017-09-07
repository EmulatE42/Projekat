package com.ftn.service.implementation;

import com.ftn.domain.Invite;
import com.ftn.domain.Visit;
import com.ftn.repository.InviteRepository;
import com.ftn.service.InviteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by EmulatE on 07-Sep-17.
 */
@Service
public class InviteServiceImpl implements InviteService{

    @Autowired
    InviteRepository inviteRepository;

    @Override
    public Invite save(Invite v) {
        return inviteRepository.save(v);
    }

    @Override
    public List<Invite> findInvitesByPrimio(String primio) {
        return inviteRepository.findInvitesByPrimio(primio);
    }

    @Override
    public void delete(String poslao, String primio, Integer idPorudzbine) {
     inviteRepository.delete(poslao,primio,idPorudzbine);
    }
}
