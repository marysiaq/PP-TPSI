package com.example.spring.payload.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

import javax.validation.constraints.*;
 @Getter@Setter
public class SignupRequest {
    @NotBlank
    @Size(min = 2, max = 40)
    private String username;
 
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    
    private Set<String> role;
    
    @NotBlank
    @Size(min = 2, max = 40)
    private String password;

}
