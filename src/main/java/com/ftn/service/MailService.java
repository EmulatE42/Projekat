package com.ftn.service;

import com.ftn.domain.Guest;

/**
 * Created by EmulatE on 24-May-17.
 */
public interface MailService {

    void sendUserActivationEmail(Guest guest, String token);
}
