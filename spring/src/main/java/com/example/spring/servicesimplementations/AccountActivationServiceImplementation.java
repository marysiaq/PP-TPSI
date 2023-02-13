package com.example.spring.servicesimplementations;

import com.example.spring.models.User;
import com.example.spring.repositories.UserRepository;
import com.example.spring.services.AccountActivationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountActivationServiceImplementation implements AccountActivationService {
    @Autowired
    UserRepository userRepository;
    @Override
    public void activateAccount(String code) {
        User user = userRepository.findUserByActivationCode(code);
        user.setEnabled(true);
        userRepository.save(user);
    }
}
