package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.dto.LoginRequest;
import com.edukini.edukini_backend.dto.RegisterRequest;
import com.edukini.edukini_backend.dto.UserPublicDto;
import com.edukini.edukini_backend.model.User;
import com.edukini.edukini_backend.repository.FiliereRepository;
import com.edukini.edukini_backend.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.UUID;


@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FiliereRepository filiereRepository;
    @Autowired
    private PasswordEncoder passwordEncoder; 
    @Autowired
    private EmailService emailService;
    public String register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email déjà utilisé";
        }

        String passwordValidationError = validatePassword(request.getPassword());
        if (passwordValidationError != null) {
            return passwordValidationError;
        }

        User user = new User();
        user.setPrenom(request.getPrenom());
        user.setNom(request.getNom());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_STUDENT");
        Long filiereId = request.getFiliereId();
        if (filiereId != null) {
            if (!filiereRepository.existsById(filiereId)) {
                return "Filière invalide";
            }
            user.setFiliereId(filiereId);
        }

        userRepository.save(user);
        return "Compte créé avec succès";
    }
    
    public Optional<UserPublicDto> findPublicProfile(String email) {
        if (email == null || email.isBlank()) {
            return Optional.empty();
        }
        return userRepository.findByEmail(email.trim())
                .map(u -> new UserPublicDto(
                        u.getId(),
                        u.getPrenom(),
                        u.getNom(),
                        u.getEmail(),
                        normalizeRole(u.getRole())
                ));
    }

    public Optional<UserPublicDto> updateProfileNames(String email, String prenom, String nom) {
        if (email == null || email.isBlank()) {
            return Optional.empty();
        }
        Optional<User> userOpt = userRepository.findByEmail(email.trim());
        if (userOpt.isEmpty()) {
            return Optional.empty();
        }
        User user = userOpt.get();
        if (prenom != null && !prenom.isBlank()) {
            user.setPrenom(prenom.trim());
        }
        if (nom != null && !nom.isBlank()) {
            user.setNom(nom.trim());
        }
        userRepository.save(user);
        return findPublicProfile(user.getEmail());
    }

    private static String normalizeRole(String role) {
        if (role == null || role.isBlank()) {
            return "";
        }
        return role.startsWith("ROLE_") ? role.substring(5) : role;
    }

    public String login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) return "Email introuvable";
        
        User user = userOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) return "Mot de passe incorrect";
        
        String role = user.getRole();
        if (role == null || role.isBlank()) {
            return "Rôle utilisateur introuvable";
        }
        return role.startsWith("ROLE_") ? role.substring(5) : role;
    }
    // Mot de passe oublié - envoi d'email
public String forgotPassword(String email) {
    Optional<User> userOpt = userRepository.findByEmail(email);
    if (userOpt.isEmpty()) {
        return "Email introuvable";
    }
    
    User user = userOpt.get();
    
    // Générer un token unique
    String token = UUID.randomUUID().toString();
    user.setResetToken(token);
    user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(15));
    
    userRepository.save(user);
    
    try {
        // Envoyer l'email
        emailService.sendResetPasswordEmail(email, token);
    } catch (MailException ex) {
        // If email sending fails, rollback token fields to avoid unusable reset tokens.
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);
        return "Impossible d'envoyer l'email de réinitialisation. Vérifie la configuration SMTP.";
    }
    
    return "Un email de réinitialisation a été envoyé";
}

// Réinitialisation du mot de passe
public String resetPassword(String token, String newPassword) {
    Optional<User> userOpt = userRepository.findByResetToken(token);
    
    if (userOpt.isEmpty()) {
        return "Token invalide";
    }
    
    User user = userOpt.get();
    
    if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
        return "Token expiré";
    }

    String passwordValidationError = validatePassword(newPassword);
    if (passwordValidationError != null) {
        return passwordValidationError;
    }
    
    // Mettre à jour le mot de passe
    user.setPassword(passwordEncoder.encode(newPassword));
    user.setResetToken(null);
    user.setResetTokenExpiry(null);
    
    userRepository.save(user);
    
    return "Mot de passe réinitialisé avec succès";
}

private String validatePassword(String password) {
    if (password == null || password.isBlank()) {
        return "Mot de passe invalide: il est requis.";
    }
    if (password.length() < 8) {
        return "Mot de passe invalide: minimum 8 caractères.";
    }
    if (!password.matches(".*[A-Z].*")) {
        return "Mot de passe invalide: ajoute au moins une majuscule.";
    }
    if (!password.matches(".*[a-z].*")) {
        return "Mot de passe invalide: ajoute au moins une minuscule.";
    }
    if (!password.matches(".*\\d.*")) {
        return "Mot de passe invalide: ajoute au moins un chiffre.";
    }
    if (!password.matches(".*[!@#$%^&*].*")) {
        return "Mot de passe invalide: ajoute au moins un caractère spécial (!@#$%^&*).";
    }
    return null;
}
}