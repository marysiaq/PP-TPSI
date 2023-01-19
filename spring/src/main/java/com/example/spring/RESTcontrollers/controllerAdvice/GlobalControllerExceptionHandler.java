package com.example.spring.RESTcontrollers.controllerAdvice;

import com.example.spring.exceptions.RecipeNotFoundException;
import org.hibernate.exception.JDBCConnectionException;
import org.springframework.http.HttpStatus;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalControllerExceptionHandler {

    @ResponseStatus(value = HttpStatus.NOT_FOUND,reason = "Nie znaleziono przepisu")  // 409
    @ExceptionHandler(RecipeNotFoundException.class)
    public void handleRecipeNotFound() {

    }




}

