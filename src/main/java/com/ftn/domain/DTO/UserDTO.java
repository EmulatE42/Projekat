package com.ftn.domain.DTO;

import com.ftn.domain.Role;
import com.ftn.domain.User;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

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

    public UserDTO() {}

    public UserDTO(User user)
    {
        this.id = user.getId();
        this.first_name = user.getFirst_name();
        this.last_name = user.getLast_name();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.role = user.getRole();
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
}
