package com.ftn.service;

import com.ftn.domain.FriendRequest;


import java.util.List;

/**
 * Created by EmulatE on 01-Sep-17.
 */
public interface FriendRequestService {


    List<FriendRequest> findFriendRequestsByDobio(String dobio);
    FriendRequest save(FriendRequest fr);
    List<FriendRequest> findFriendRequestsByUputio( String uputio);

    void delete( String uputio,  String dobio);

}
