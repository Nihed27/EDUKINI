package com.edukini.edukini_backend.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapKeyColumn;
import java.util.HashMap;
import java.util.Map;

@Entity
public class Profil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;
    private String email;
    private String adresse;
    private String nomPrepa;
    private String telephone;

    private Integer rang;
    private Double score;

    private String filiere; // PC, PT, MP

    @ElementCollection
    @CollectionTable(name = "profil_notes", joinColumns = @JoinColumn(name = "profil_id"))
    @MapKeyColumn(name = "matiere")
    @Column(name = "note")
    private Map<String, Double> notes = new HashMap<>();

    public Profil() {}

    // Getters & Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public String getNomPrepa() { return nomPrepa; }
    public void setNomPrepa(String nomPrepa) { this.nomPrepa = nomPrepa; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public Integer getRang() { return rang; }
    public void setRang(Integer rang) { this.rang = rang; }

    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }

    public String getFiliere() { return filiere; }
    public void setFiliere(String filiere) { this.filiere = filiere; }

    public Map<String, Double> getNotes() { return notes; }
    public void setNotes(Map<String, Double> notes) { this.notes = notes; }
}
