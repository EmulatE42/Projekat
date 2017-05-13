package com.ftn.service;

import com.ftn.domain.User;

/**
 * Created by EmulatE on 10-May-17.
 */
public interface UserService {
 // ovde su moje u rep su postojece kom
    User findOne(Integer id);
    User save(User user) throws Exception;

}
