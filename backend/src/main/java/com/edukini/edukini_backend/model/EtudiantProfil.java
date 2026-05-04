package com.edukini.edukini_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class EtudiantProfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;
    private double moyenneGenerale;

    private double noteMaths;
    private double notePhysique;
    private double noteInformatique;
    private double noteAnglais;
    private double noteElectronique;
    private double noteReseaux;

    private int rangConcours;
    private Long etudiantId;

    public EtudiantProfil() {}

    public EtudiantProfil(Long id, String nom, String prenom, double moyenneGenerale, double noteMaths, double notePhysique, double noteInformatique, double noteAnglais, double noteElectronique, double noteReseaux, int rangConcours, Long etudiantId) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.moyenneGenerale = moyenneGenerale;
        this.noteMaths = noteMaths;
        this.notePhysique = notePhysique;
        this.noteInformatique = noteInformatique;
        this.noteAnglais = noteAnglais;
        this.noteElectronique = noteElectronique;
        this.noteReseaux = noteReseaux;
        this.rangConcours = rangConcours;
        this.etudiantId = etudiantId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public double getMoyenneGenerale() { return moyenneGenerale; }
    public void setMoyenneGenerale(double moyenneGenerale) { this.moyenneGenerale = moyenneGenerale; }

    public double getNoteMaths() { return noteMaths; }
    public void setNoteMaths(double noteMaths) { this.noteMaths = noteMaths; }

    public double getNotePhysique() { return notePhysique; }
    public void setNotePhysique(double notePhysique) { this.notePhysique = notePhysique; }

    public double getNoteInformatique() { return noteInformatique; }
    public void setNoteInformatique(double noteInformatique) { this.noteInformatique = noteInformatique; }

    public double getNoteAnglais() { return noteAnglais; }
    public void setNoteAnglais(double noteAnglais) { this.noteAnglais = noteAnglais; }

    public double getNoteElectronique() { return noteElectronique; }
    public void setNoteElectronique(double noteElectronique) { this.noteElectronique = noteElectronique; }

    public double getNoteReseaux() { return noteReseaux; }
    public void setNoteReseaux(double noteReseaux) { this.noteReseaux = noteReseaux; }

    public int getRangConcours() { return rangConcours; }
    public void setRangConcours(int rangConcours) { this.rangConcours = rangConcours; }

    public Long getEtudiantId() { return etudiantId; }
    public void setEtudiantId(Long etudiantId) { this.etudiantId = etudiantId; }
}
