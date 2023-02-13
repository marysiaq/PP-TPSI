package com.example.spring.controller;

import com.example.spring.services.AccountActivationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
public class AccountActivationController {
    @Autowired
    AccountActivationService accountActivationService;


    @GetMapping(value={"/activate"})
    public String activate ( @RequestParam(value="code") String code){
        accountActivationService.activateAccount(code);
        return  "activated";
    }
}
