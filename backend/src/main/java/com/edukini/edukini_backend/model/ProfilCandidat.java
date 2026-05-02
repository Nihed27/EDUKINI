package com.edukini.edukini_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "profil_candidat")
public class ProfilCandidat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long etudiantId;
    private String licence;
    private String specialite;
    private Double moyenne;
    private String niveauAnglais;

    @Column(columnDefinition = "TEXT")
    private String competences; // JSON string: ["Informatique","Réseaux"]

    @Column(columnDefinition = "TEXT")
    private String motivation;

    public ProfilCandidat() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getEtudiantId() { return etudiantId; }
    public void setEtudiantId(Long etudiantId) { this.etudiantId = etudiantId; }

    public String getLicence() { return licence; }
    public void setLicence(String licence) { this.licence = licence; }

    public String getSpecialite() { return specialite; }
    public void setSpecialite(String specialite) { this.specialite = specialite; }

    public Double getMoyenne() { return moyenne; }
    public void setMoyenne(Double moyenne) { this.moyenne = moyenne; }

    public String getNiveauAnglais() { return niveauAnglais; }
    public void setNiveauAnglais(String niveauAnglais) { this.niveauAnglais = niveauAnglais; }

    public String getCompetences() { return competences; }
    public void setCompetences(String competences) { this.competences = competences; }

    public String getMotivation() { return motivation; }
    public void setMotivation(String motivation) { this.motivation = motivation; }
}
