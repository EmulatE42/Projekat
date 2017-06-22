package com.ftn.repository;

import com.ftn.domain.VerificationGuest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Created by EmulatE on 24-May-17.
 */
public interface VerificationTokenRepository  extends JpaRepository<VerificationGuest, String> {
    //VerificationGuest findById(Integer verificationTokenId);

    VerificationGuest findByToken(String verificationTokenValue);
    @Query("SELECT vt.token FROM VerificationGuest vt WHERE vt.email = :email")
    String findTokenByUserEmail(@Param("email") String email);

}
