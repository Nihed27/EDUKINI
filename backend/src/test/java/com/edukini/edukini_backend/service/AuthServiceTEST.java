package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.dto.LoginRequest;
import com.edukini.edukini_backend.dto.RegisterRequest;
import com.edukini.edukini_backend.model.User;
import com.edukini.edukini_backend.repository.FiliereRepository;
import com.edukini.edukini_backend.repository.UserRepository;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

public class AuthServiceTEST {

    @Mock
    private UserRepository userRepository;
    
    @Mock
    private FiliereRepository filiereRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @Mock
    private EmailService emailService;

    @InjectMocks
    private AuthService authService;

    private AutoCloseable closeable;

    @BeforeClass
    public static void setUpBeforeClass() {
        // Exécutée avant le premier test
    }

    @Before
    public void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    @After
    public void tearDown() throws Exception {
        closeable.close();
    }

    @AfterClass
    public static void tearDownAfterClass() {
        // Exécutée après le dernier test
    }

    @Test
    public void testRegisterNominal() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("test@example.com");
        request.setPassword("Password123!");
        request.setNom("Nom");
        request.setPrenom("Prenom");

        Mockito.when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.empty());
        Mockito.when(passwordEncoder.encode("Password123!")).thenReturn("encodedPassword");

        String result = authService.register(request);

        Assert.assertEquals("Compte créé avec succès", result);
        Mockito.verify(userRepository).save(Mockito.any(User.class));
    }

    @Test
    public void testRegisterEmailAlreadyExists() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("existing@example.com");
        request.setPassword("Password123!");

        Mockito.when(userRepository.findByEmail("existing@example.com")).thenReturn(Optional.of(new User()));

        String result = authService.register(request);

        Assert.assertEquals("Email déjà utilisé", result);
    }

    @Test
    public void testLoginNominal() {
        LoginRequest request = new LoginRequest();
        request.setEmail("user@example.com");
        request.setPassword("Password123!");

        User user = new User();
        user.setEmail("user@example.com");
        user.setPassword("encodedPassword");
        user.setRole("ROLE_STUDENT");

        Mockito.when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        Mockito.when(passwordEncoder.matches("Password123!", "encodedPassword")).thenReturn(true);

        String result = authService.login(request);

        Assert.assertEquals("STUDENT", result);
    }

    @Test
    public void testLoginInvalidPassword() {
        LoginRequest request = new LoginRequest();
        request.setEmail("user@example.com");
        request.setPassword("wrong");

        User user = new User();
        user.setPassword("encodedPassword");

        Mockito.when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        Mockito.when(passwordEncoder.matches("wrong", "encodedPassword")).thenReturn(false);

        String result = authService.login(request);

        Assert.assertEquals("Mot de passe incorrect", result);
    }
}
