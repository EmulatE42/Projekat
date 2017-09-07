package com.ftn.repository;

import com.ftn.domain.FriendRequest;
import com.ftn.domain.Invite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by EmulatE on 07-Sep-17.
 */
public interface InviteRepository extends JpaRepository<Invite,Integer> {

    @Query("SELECT f FROM Invite f WHERE f.primio = :primio")
    List<Invite> findInvitesByPrimio(@Param("primio") String primio);

    @Transactional
    @Modifying
    @Query("delete FROM Invite f WHERE f.poslao = :poslao and f.primio = :primio and f.idPorudzbine = :idPorudzbine")
    void delete(@Param("poslao") String poslao, @Param("primio") String primio,@Param("idPorudzbine") Integer idPorudzbine);
}
