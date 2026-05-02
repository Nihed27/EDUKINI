// C:/Users/MSI/EDUKINI/backend/src/main/java/com/edukini/edukini_backend/service/AuthService.java
package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.dto.LoginRequest;
import com.edukini.edukini_backend.dto.RegisterRequest;
import com.edukini.edukini_backend.model.User;
import com.edukini.edukini_backend.repository.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public String register(RegisterRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return "Email et mot de passe obligatoires";
        }

        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            return "Email deja utilise";
        }

        User user = new User();
        user.setPrenom(request.getPrenom());
        user.setNom(request.getNom());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        userRepository.save(user);

        return "Inscription reussie";
    }

    public String login(LoginRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return "Email ou mot de passe incorrect";
        }

        Optional<User> user = userRepository.findByEmail(request.getEmail());
        if (user.isEmpty()) {
            return "Email ou mot de passe incorrect";
        }

        if (!user.get().getPassword().equals(request.getPassword())) {
            return "Email ou mot de passe incorrect";
        }

        return "Connexion reussie";
    }
}
