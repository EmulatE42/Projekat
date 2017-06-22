package com.ftn.service;

import com.ftn.domain.Friendship;
import com.ftn.domain.Guest;
import java.util.List;

/**
 * Created by EmulatE on 25-May-17.
 */
public interface FriendsService {
    List<Guest> getGuests();
    Friendship save(Friendship f);
    void delete(String prvi, String drugi);
    List<Friendship> getFriendshipsByEmailPrvog(String koSalje);
}
