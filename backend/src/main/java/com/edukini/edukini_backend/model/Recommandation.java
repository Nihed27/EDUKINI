package com.edukini.edukini_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Recommandation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String specialite;
    private String ecole;
    private int score;
    private int placesDisponibles;
    private int rangMinimum;
    private Long etudiantId;
    private String label;

    public Recommandation() {}

    public Recommandation(Long id, String specialite, String ecole, int score, int placesDisponibles, int rangMinimum, Long etudiantId, String label) {
        this.id = id;
        this.specialite = specialite;
        this.ecole = ecole;
        this.score = score;
        this.placesDisponibles = placesDisponibles;
        this.rangMinimum = rangMinimum;
        this.etudiantId = etudiantId;
        this.label = label;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSpecialite() { return specialite; }
    public void setSpecialite(String specialite) { this.specialite = specialite; }

    public String getEcole() { return ecole; }
    public void setEcole(String ecole) { this.ecole = ecole; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public int getPlacesDisponibles() { return placesDisponibles; }
    public void setPlacesDisponibles(int placesDisponibles) { this.placesDisponibles = placesDisponibles; }

    public int getRangMinimum() { return rangMinimum; }
    public void setRangMinimum(int rangMinimum) { this.rangMinimum = rangMinimum; }

    public Long getEtudiantId() { return etudiantId; }
    public void setEtudiantId(Long etudiantId) { this.etudiantId = etudiantId; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
}
