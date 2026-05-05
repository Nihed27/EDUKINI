package com.edukini.edukini_backend.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

public class EmailServiceTEST {

    @Mock
    private JavaMailSender mailSender;

    @InjectMocks
    private EmailService emailService;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSendResetPasswordEmail() {
        emailService.sendResetPasswordEmail("test@example.com", "token123");
        Mockito.verify(mailSender).send(Mockito.any(SimpleMailMessage.class));
    }
}
