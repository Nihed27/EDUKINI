package com.edukini.edukini_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class NoteEtudiant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long etudiantId;
    private String filiere;      // ex: "informatique"
    private Integer semestre;    // 1 ou 2
    private String ueNom;        // ex: "UE1.1 — Mathématiques"
    private String matiereNom;   // ex: "Algorithmique"
    private Double note;         // 0 à 20

    public NoteEtudiant() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getEtudiantId() { return etudiantId; }
    public void setEtudiantId(Long etudiantId) { this.etudiantId = etudiantId; }

    public String getFiliere() { return filiere; }
    public void setFiliere(String filiere) { this.filiere = filiere; }

    public Integer getSemestre() { return semestre; }
    public void setSemestre(Integer semestre) { this.semestre = semestre; }

    public String getUeNom() { return ueNom; }
    public void setUeNom(String ueNom) { this.ueNom = ueNom; }

    public String getMatiereNom() { return matiereNom; }
    public void setMatiereNom(String matiereNom) { this.matiereNom = matiereNom; }

    public Double getNote() { return note; }
    public void setNote(Double note) { this.note = note; }
}
