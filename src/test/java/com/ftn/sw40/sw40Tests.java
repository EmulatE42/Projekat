package com.ftn.sw40;

import com.ftn.domain.*;
import com.ftn.repository.UserRepository;
import com.ftn.service.FriendRequestService;
import com.ftn.service.InviteService;
import com.ftn.service.VisitService;
import com.ftn.service.implementation.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.Assert.assertEquals;

/**
 * Created by EmulatE on 06-Sep-17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class sw40Tests {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserServiceImpl userServiceimpl;
    @Autowired
    private FriendsServiceImpl friendsService;
    @Autowired
    private FriendRequestServiceImpl friendRequestService;
    @Autowired
    private OrderServiceImp orderServiceImp;
    @Autowired
    private VisitServiceImpl visitService;
    @Autowired
    private InviteServiceImpl inviteService;


    @Test
    public void testReg() {

        userServiceimpl.register("Pera","Peric","testEmail","testSifra");
        Guest temp = (Guest) userRepository.findAllByEmailAndPassword("testEmail","testSifra");
        System.out.println("Vratio sam " + temp.getEmail());

        List<Guest> t = friendsService.getGuests();
        for (Guest g:t) {
            System.out.println("ime je " + g.getFirst_name());
        }
        assertEquals(temp.getEmail(),"testEmail");


    }


    @Test
    public void testLog() {

        userServiceimpl.register("Mika","Mikic","miki@gmail.com","miki123");
        Guest temp = (Guest) userRepository.findAllByEmailAndPassword("miki@gmail.com","miki123");
        System.out.println("Vratio sam LOG " + temp.getEmail());
        Guest rez = (Guest) userServiceimpl.login(temp.getEmail(),temp.getPassword());
        System.out.println("Vratio sam LOG2 " + rez.getEmail());
        assertEquals(rez.getEmail(),temp.getEmail());

    }


    @Test
    public void sendFriendRequest()
    {
        userServiceimpl.register("Pera","Peric","testEmail","ss1");
        userServiceimpl.register("M","M","testEmail2","ss2");
        FriendRequest a = new FriendRequest();
        a.setUputio("testEmail");
        a.setDobio("testEmail2");
        FriendRequest friendRequest =  this.friendRequestService.save(a);
        List<FriendRequest> ret  =this.friendRequestService.findFriendRequestsByUputio("testEmail");
        if (ret.size() ==1)
        {
            assertEquals("testEmail",ret.get(0).getUputio());
        }
    }

    
    @Test
    public void AcceptRequest()
    {
        userServiceimpl.register("A","A","tes","ss1");
        userServiceimpl.register("N","N","test","ss2");
        FriendRequest a = new FriendRequest();
        a.setUputio("tes");
        a.setDobio("test");
         this.friendRequestService.save(a);

        List<Friendship> f = friendsService.getFriendshipsByEmailPrvog("tes");
        if (f.size() ==1)
        {
            assertEquals("tes",f.get(0).getEmailPrvog());
        }
    }


    @Test
    public void reserveRestaurant()
    {
        Order o = new Order(null,null,null,"Restoran1","super");
        this.orderServiceImp.saveOrder(o);
        Set<Order> os =  orderServiceImp.getOrders();
        for (Order s : os) {
            if (s.getNazivRestorana().equals("Restoran1")) {
                assertEquals("Restoran1", s.getNazivRestorana());
            }
        }

    }


    @Test
    public void testVisit()
    {
        Visit a = new Visit();
        a.setEmail("tee");
        a.setNazivRestorana("reST");
        a.setDatum("DATUM");
        a.setGotov(0);
        a.setGotov(0);

        Visit t =  visitService.save(a);
        assertEquals(t.getEmail(),"tee");
    }


    @Test
    public void testInvite()
    {
        Invite f = new Invite("email","emaildrugi","REST","DATUM",2);
       Invite a = this.inviteService.save(f);
        assertEquals(a.getPoslao(),"email");
    }

}
