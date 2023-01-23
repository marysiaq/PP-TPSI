package com.example.spring.services;


import javax.mail.MessagingException;

public interface EmailService {
    public void sendSimpleMessage(
            String to, String subject, String text) ;
    public void sendMimeMessage(String to, String subject, String text)
            throws MessagingException;

    String build(String header, String title,String description,String code);
    //public void abcd() throws MessagingException;
}
