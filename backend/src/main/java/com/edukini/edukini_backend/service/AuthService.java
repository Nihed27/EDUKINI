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
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email déjà utilisé";
        }

        User user = new User();
        user.setPrenom(request.getPrenom());
        user.setNom(request.getNom());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // on hashera plus tard
        user.setRole("STUDENT");


        userRepository.save(user);
        return "Compte créé avec succès";
    }
    public String login(LoginRequest request) {
    Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
    if (userOpt.isEmpty()) return "Email introuvable";
    
    User user = userOpt.get();
    if (!user.getPassword().equals(request.getPassword())) return "Mot de passe incorrect";
    
   return user.getRole(); 
}
}