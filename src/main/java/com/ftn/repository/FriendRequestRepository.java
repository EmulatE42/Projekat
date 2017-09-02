package com.ftn.repository;

import com.ftn.domain.FriendRequest;
import com.ftn.domain.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by EmulatE on 01-Sep-17.
 */
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Integer> {

    @Query("SELECT f FROM FriendRequest f WHERE f.dobio = :dobio")
    List<FriendRequest> findFriendRequestsByDobio(@Param("dobio") String dobio);

    @Query("SELECT f FROM FriendRequest f WHERE f.uputio = :uputio")
    List<FriendRequest> findFriendRequestsByUputio(@Param("uputio") String uputio);

    @Transactional
    @Modifying
    @Query("delete FROM FriendRequest f WHERE f.uputio = :uputio and f.dobio = :dobio")
    void delete(@Param("uputio") String uputio, @Param("dobio") String dobio);

}
