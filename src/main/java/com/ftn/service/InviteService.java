package com.ftn.service;

import com.ftn.domain.Invite;
import com.ftn.domain.Visit;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by EmulatE on 07-Sep-17.
 */
public interface InviteService {


    Invite save(Invite v);
    List<Invite> findInvitesByPrimio(@Param("primio") String primio);

     void delete(@Param("poslao") String poslao, @Param("primio") String primio,@Param("idPorudzbine") Integer idPorudzbine);


}
