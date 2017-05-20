package com.ftn.domain.DTO;

import com.ftn.domain.*;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by Momir on 5/18/2017.
 */
public class UserDTO implements Serializable {


    private Integer id;

    private String first_name;

    private String last_name;

    private String email;

    private String password;

    private Role role;

    private boolean online;

    private Date birth;

    private int dressSize;

    private int shoeSize;

    private boolean firstTimeLogin;

    public UserDTO() {}

    public UserDTO(Guest guest) {

        this.id = guest.getId();
        this.first_name = guest.getFirst_name();
        this.last_name = guest.getLast_name();
        this.email = guest.getEmail();
        this.password = guest.getPassword();
        this.role = guest.getRole();
        this.birth = null;
        this.dressSize = -1;
        this.shoeSize = -1;
        this.firstTimeLogin = false;
    }

    public UserDTO(Waiter waiter) {

        this.id = waiter.getId();
        this.first_name = waiter.getFirst_name();
        this.last_name = waiter.getLast_name();
        this.email = waiter.getEmail();
        this.password = waiter.getPassword();
        this.role = waiter.getRole();
        this.birth = waiter.getBirth();
        this.dressSize = waiter.getDressSize();
        this.shoeSize = waiter.getShoeSize();
        this.firstTimeLogin = waiter.isFirstTimeLogin();
    }

    public UserDTO(Cook cook) {

        this.id = cook.getId();
        this.first_name = cook.getFirst_name();
        this.last_name = cook.getLast_name();
        this.email = cook.getEmail();
        this.password = cook.getPassword();
        this.role = cook.getRole();
        this.birth = cook.getBirth();
        this.dressSize = cook.getDressSize();
        this.shoeSize = cook.getShoeSize();
        this.firstTimeLogin = cook.isFirstTimeLogin();
    }

    public UserDTO(Bartender bartender) {

        this.id = bartender.getId();
        this.first_name = bartender.getFirst_name();
        this.last_name = bartender.getLast_name();
        this.email = bartender.getEmail();
        this.password = bartender.getPassword();
        this.role = bartender.getRole();
        this.birth = bartender.getBirth();
        this.dressSize = bartender.getDressSize();
        this.shoeSize = bartender.getShoeSize();
        this.firstTimeLogin = bartender.isFirstTimeLogin();
    }

    public UserDTO(Integer id, String first_name, String last_name, String email, String password, Role role, boolean online, Date birth, int dressSize, int shoeSize, boolean firstTimeLogin) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.online = online;
        this.birth = birth;
        this.dressSize = dressSize;
        this.shoeSize = shoeSize;
        this.firstTimeLogin = firstTimeLogin;
    }

    public Integer getId() {
        return id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }

    public Date getBirth() {
        return birth;
    }

    public int getDressSize() {
        return dressSize;
    }

    public int getShoeSize() {
        return shoeSize;
    }

    public boolean isFirstTimeLogin() {
        return firstTimeLogin;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public void setDressSize(int dressSize) {
        this.dressSize = dressSize;
    }

    public void setShoeSize(int shoeSize) {
        this.shoeSize = shoeSize;
    }

    public void setFirstTimeLogin(boolean firstTimeLogin) {
        this.firstTimeLogin = firstTimeLogin;
    }

    public boolean isOnline() {
        return online;
    }

    public void setOnline(boolean online) {
        this.online = online;
    }
}
