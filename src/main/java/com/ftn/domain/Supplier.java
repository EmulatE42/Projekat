package com.ftn.domain;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Bane on 17/5/2017.
 */
@Entity
@Table(name = "supplier")
public class Supplier extends User {

   @Column(name = "birth" , unique = false, nullable = false)
   private Date birth;

   @Column(name = "firstTimeLogin" , unique = false, nullable = false)
   private boolean firstTimeLogin;

   public Supplier() {}

   public Supplier(String first_name, String last_name, String email, String password, Role role, Date birth, boolean firstTimeLogin) {
      super(first_name, last_name, email, password, role);
      this.birth = birth;
      this.firstTimeLogin = firstTimeLogin;
   }

   public Date getBirth() {
      return birth;
   }

   public void setBirth(Date birth) {
      this.birth = birth;
   }

   public boolean isFirstTimeLogin() {
      return firstTimeLogin;
   }

   public void setFirstTimeLogin(boolean firstTimeLogin) {
      this.firstTimeLogin = firstTimeLogin;
   }

}
