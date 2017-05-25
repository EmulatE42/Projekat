package com.ftn.service;

import com.ftn.domain.VerificationGuest;

/**
 * Created by EmulatE on 24-May-17.
 */
public interface VerificationGuestService {
    Boolean activateGuest(String email, String verificationTokenValue);
    String getTokenByUserEmail(String email);
    VerificationGuest save(VerificationGuest vg);
}
