package com.edukini.edukini_backend.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
    private String prenom;
    private String nom;
    private String email;
    
    @Size(min = 8, max = 30, message = "Le mot de passe doit contenir entre 8 et 30 caractères")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$",
             message = "Le mot de passe doit contenir au moins un chiffre, une majuscule, une minuscule et un caractère spécial")
    private String password;

    // Getters et Setters
    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}