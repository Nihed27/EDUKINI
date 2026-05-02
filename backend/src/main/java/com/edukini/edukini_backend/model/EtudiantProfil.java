package com.edukini.edukini_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
