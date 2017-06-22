package com.ftn;

import com.ftn.domain.Guest;
import com.ftn.repository.UserRepository;
import com.ftn.service.implementation.UserServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class ProjekatApplicationTests {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserServiceImpl userServiceimpl;
	@Test
	public void testReg() {

		userServiceimpl.register("Pera","Peric","peki@gmail.com","pera123");
		Guest temp = (Guest) userRepository.findAllByEmailAndPassword("peki@gmail.com","pera123");
		System.out.println("Vratio sam " + temp.getEmail());
		assertEquals(temp.getEmail(),"peki@gmail.com");


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

}
