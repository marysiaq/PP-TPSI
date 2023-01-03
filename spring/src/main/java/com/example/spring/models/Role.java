package com.example.spring.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    private Integer id;
    private Types type;
    private Set<User> users;
    public Role(Types type){
        this.type = type;
    }
    public static enum Types{
        ROLE_ADMIN,
        ROLE_USER
    }
}
