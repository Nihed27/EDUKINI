package com.edukini.edukini_backend.model;

import jakarta.persistence.*;
import java.io.Serializable;  
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User implements Serializable { 
    
    private static final long serialVersionUID = 1L; 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String prenom;
    private String nom;

    @Column(unique = true, nullable = false)  
    private String email;

    private String password;
    
    private String role;  // "STUDENT" ou "ADMIN"
    @Column(nullable = true)
    private String resetToken;

    @Column(nullable = true)
    private LocalDateTime resetTokenExpiry;
    // Constructeur par défaut (OBLIGATOIRE pour JPA)
    public User() {}

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getResetToken() { return resetToken; }
public void setResetToken(String resetToken) { this.resetToken = resetToken; }

public LocalDateTime getResetTokenExpiry() { return resetTokenExpiry; }
public void setResetTokenExpiry(LocalDateTime resetTokenExpiry) { this.resetTokenExpiry = resetTokenExpiry; }
}