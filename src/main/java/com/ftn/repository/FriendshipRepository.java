package com.ftn.repository;

import com.ftn.domain.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by EmulatE on 22-Jun-17.
 */
public interface FriendshipRepository  extends JpaRepository<Friendship, Integer> {

    @Query("SELECT f FROM Friendship f WHERE f.koSalje = :koSalje")
    List<Friendship> findFriendshipsByEmailPrvog(@Param("koSalje") String koSalje);

    @Transactional
    @Modifying
    @Query("delete FROM Friendship f WHERE f.koSalje = :koSalje and f.komeSeSalje = :komeSeSalje")
    void delete(@Param("koSalje") String koSalje, @Param("komeSeSalje") String komeSeSalje);

}





