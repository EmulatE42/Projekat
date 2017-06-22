package com.ftn.service.implementation;

import com.ftn.domain.Friendship;
import com.ftn.domain.Guest;
import com.ftn.domain.Restaurant;
import com.ftn.domain.User;

import com.ftn.repository.FriendshipRepository;
import com.ftn.repository.UserRepository;
import com.ftn.service.FriendsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by EmulatE on 25-May-17.
 */
@Service
public class FriendsServiceImpl  implements FriendsService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FriendshipRepository friendshipRepository;


    @Override
    public List<Guest> getGuests() {
        List<User> u = userRepository.findAll();
        List<Guest> g = new ArrayList<Guest>();
        for (User a : u ) {
            try {
            g.add((Guest) a);}
            catch (Exception e) {

            }
        }
        return g;

    }

    @Override
    public Friendship save(Friendship f) {
        return friendshipRepository.save(f);
    }




    @Override
    public  void delete(String prvi, String drugi) {
        friendshipRepository.delete(prvi,drugi);
    }

    @Override
    public List<Friendship> getFriendshipsByEmailPrvog(String koSalje) {

        List<Friendship> f = friendshipRepository.findFriendshipsByEmailPrvog(koSalje);

        return f;
    }
}

