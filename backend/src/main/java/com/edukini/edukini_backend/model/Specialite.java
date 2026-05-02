package com.edukini.edukini_backend.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Specialite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String code;
    private String icon;
    private Long filiereId;
    private String description;
    private Integer capacite;
    private String annee;
    private Boolean actif;

    @ElementCollection
    @CollectionTable(name = "specialite_debouches", joinColumns = @JoinColumn(name = "specialite_id"))
    @Column(name = "debouche")
    private List<String> debouches = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "specialite_competences", joinColumns = @JoinColumn(name = "specialite_id"))
    @Column(name = "competence")
    private List<String> competences = new ArrayList<>();

    public Specialite() {
    }

    // Getters & Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public Long getFiliereId() { return filiereId; }
    public void setFiliereId(Long filiereId) { this.filiereId = filiereId; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getCapacite() { return capacite; }
    public void setCapacite(Integer capacite) { this.capacite = capacite; }

    public String getAnnee() { return annee; }
    public void setAnnee(String annee) { this.annee = annee; }

    public Boolean getActif() { return actif; }
    public void setActif(Boolean actif) { this.actif = actif; }

    public List<String> getDebouches() { return debouches; }
    public void setDebouches(List<String> debouches) { this.debouches = debouches; }

    public List<String> getCompetences() { return competences; }
    public void setCompetences(List<String> competences) { this.competences = competences; }
}
