package com.example.spring.servicesimplementations;



import com.example.spring.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;


@Component
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void sendSimpleMessage(
            String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();;
        message.setFrom("no-reply@gmail.com");
        message.setTo(to);

        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);

    }

    public void sendMimeMessage(String to, String subject, String text)
            throws MessagingException {
        var mimeMessage = emailSender.createMimeMessage();
        var helper = new MimeMessageHelper(mimeMessage, "utf-8");
        helper.setFrom("noreply@uph.edu.pl");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text, true); //czy HTML
        emailSender.send(mimeMessage);
    }

    public String build(String header, String title,String description,String code){
        var thymeleafCtx = new Context();
        thymeleafCtx.setVariable("header", header);
        thymeleafCtx.setVariable("title", title);
        thymeleafCtx.setVariable("description", description);
        thymeleafCtx.setVariable("code",code);
        String html = templateEngine.process("mail", thymeleafCtx);
        return html;

    }

    //public void buildVerificationUrl(final String baseURL, final String token){
       // final String url= UriComponentsBuilder.fromHttpUrl(baseURL)
         //       .path("/register/verify").queryParam("token", token).toUriString();
       // put("verificationURL", url);
    //}

}
