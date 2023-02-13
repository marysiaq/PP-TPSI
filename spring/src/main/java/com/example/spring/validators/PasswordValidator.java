package com.example.spring.validators;


import com.example.spring.payload.request.SignupRequest;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class PasswordValidator implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return SignupRequest.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        var p = (SignupRequest ) target;
        if(!p.getPassword().matches("^(?=.*[A-Za-z])(?=.*d)[A-Za-z]{8,}$")){
            errors.rejectValue("password","Confirm.signUpRequest.password");

        }
    }
}
