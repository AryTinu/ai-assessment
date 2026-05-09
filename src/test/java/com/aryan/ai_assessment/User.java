package com.aryan.ai_assessment;

import java.time.LocalDateTime;

public class User {
     private Long id;
    private String name ; 
    private String email ;
    private String password ;
    private Role role;
    private LocalDateTime createdAt;
    
    //constructor
    public User(){
    }

    //Gretters and Setters
    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id = id;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public Role getRole(){
        return role;
    }
    public void setRole(Role role){
        this.role = role;
    }

    public LocalDateTime getCreatedAt(){
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt){
        this.createdAt = createdAt;
    }
}
