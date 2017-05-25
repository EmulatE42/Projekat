package com.ftn.service.implementation;

import com.ftn.domain.Guest;
import com.ftn.domain.VerificationGuest;
import com.ftn.repository.UserRepository;
import com.ftn.repository.VerificationTokenRepository;
import com.ftn.service.UserService;
import com.ftn.service.VerificationGuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by EmulatE on 24-May-17.
 */
@Service
public class VerificationGuestServiceImpl implements VerificationGuestService {

    private final UserRepository userRepository;
    @Autowired
    private UserService userService;
    private final VerificationTokenRepository verificationTokenRepository;


    @Autowired
    public VerificationGuestServiceImpl(UserRepository userRepository, VerificationTokenRepository verificationTokenRepository)
    {
        this.userRepository = userRepository;
        this.verificationTokenRepository = verificationTokenRepository;
    }

    @Override
    public Boolean activateGuest(String email, String verificationTokenValue) {
        Guest g = (Guest) userRepository.findByEmail(email);
        g.setEnabled(true);
        System.out.println("POSTAVLJAM");
        userService.save(g);
        System.out.println("SNIMIO");
        return true;
    }

    @Override
    public String getTokenByUserEmail(String email) {
        String token = verificationTokenRepository.findTokenByUserEmail(email);
        return token;
    }


    @Override
    public VerificationGuest save(VerificationGuest vg) {
        return verificationTokenRepository.save(vg);
    }

}
