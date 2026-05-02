package com.edukini.edukini_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "edu_notes")
public class EduNote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long etudiantId;
    private String filiere;
    private int semestre;
    private String ueNom;
    private String matiereNom;
    private Double note;

    public EduNote() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getEtudiantId() { return etudiantId; }
    public void setEtudiantId(Long etudiantId) { this.etudiantId = etudiantId; }

    public String getFiliere() { return filiere; }
    public void setFiliere(String filiere) { this.filiere = filiere; }

    public int getSemestre() { return semestre; }
    public void setSemestre(int semestre) { this.semestre = semestre; }

    public String getUeNom() { return ueNom; }
    public void setUeNom(String ueNom) { this.ueNom = ueNom; }

    public String getMatiereNom() { return matiereNom; }
    public void setMatiereNom(String matiereNom) { this.matiereNom = matiereNom; }

    public Double getNote() { return note; }
    public void setNote(Double note) { this.note = note; }
}
