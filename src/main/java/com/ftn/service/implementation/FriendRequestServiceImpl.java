package com.ftn.service.implementation;

import com.ftn.domain.FriendRequest;
import com.ftn.repository.FriendRequestRepository;
import com.ftn.service.FriendRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by EmulatE on 01-Sep-17.
 */
@Service
public class FriendRequestServiceImpl implements FriendRequestService{
    @Autowired
    FriendRequestRepository friendRequestRepository;

    @Override
    public List<FriendRequest> findFriendRequestsByDobio(String dobio) {
        return friendRequestRepository.findFriendRequestsByDobio(dobio);
    }

    @Override
    public FriendRequest save(FriendRequest fr) {
        return friendRequestRepository.save(fr);
    }

    @Override
    public List<FriendRequest> findFriendRequestsByUputio(String uputio) {
        return friendRequestRepository.findFriendRequestsByUputio(uputio);
    }

    @Override
    public void delete(String uputio, String dobio) {
        friendRequestRepository.delete( uputio,  dobio);
    }
}
