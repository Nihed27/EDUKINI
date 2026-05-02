package com.edukini.edukini_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendResetPasswordEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Réinitialisation de votre mot de passe - Edukini");
        message.setText("Bonjour,\n\n"
                + "Cliquez sur le lien suivant pour réinitialiser votre mot de passe :\n"
                + "http://localhost:4200/reset-password?token=" + token + "\n\n"
                + "Ce lien expirera dans 15 minutes.\n\n"
                + "Cordialement,\nL'équipe Edukini");
        mailSender.send(message);
    }
}