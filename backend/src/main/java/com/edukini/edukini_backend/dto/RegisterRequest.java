// C:/Users/MSI/EDUKINI/backend/src/main/java/com/edukini/edukini_backend/dto/RegisterRequest.java
package com.edukini.edukini_backend.dto;

public class RegisterRequest {

    private String prenom;
    private String nom;
    private String email;
    private String password;

    public RegisterRequest() {
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
