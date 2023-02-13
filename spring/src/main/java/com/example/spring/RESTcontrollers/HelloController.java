package com.example.spring.RESTcontrollers;

import DTO.RecipeLikes;
import com.example.spring.repositories.LikeRepository;
import com.example.spring.services.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
public class HelloController {
    @Autowired
    LikeRepository likeRepository;
    @Autowired
    LikeService likeService;

    @RequestMapping(method = RequestMethod.GET, value = "/api/javainuse")
    public String sayHello() {

        return "Swagger Hello World";
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/test")
    public List<RecipeLikes> test() {

        return likeService.getRanking();
    }

}
