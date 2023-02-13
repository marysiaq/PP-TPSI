package com.example.spring.servicesimplementations;

import com.example.spring.repositories.LikeRepository;
import com.example.spring.repositories.RoleRepository;
import com.example.spring.repositories.UserRepository;
import com.example.spring.services.LikeService;
import com.example.spring.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
@Service
public class UserServiceImplementation implements UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    LikeRepository likeRepository;
    @Autowired
    RoleRepository roleRepository;

    @Override
    @Transactional
    public void deleteAccount(Long user_id) {
        likeRepository.deleteAll(likeRepository.findLikeByUserId(user_id));
        userRepository.deleteById(user_id);
    }
}
