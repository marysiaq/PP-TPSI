package com.example.spring.validators;

import com.example.spring.models.User;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class PasswordConfirmValidator implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        var p = (User) target;
        if(!p.getPassword().equals(p.getPasswordConfirm())){
            errors.rejectValue("passwordConfirm","Confirm.user.passwordConfirm");

        }
    }
}
