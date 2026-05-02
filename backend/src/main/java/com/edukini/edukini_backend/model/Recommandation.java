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
    private String label; // "Recommandé" / "Compatible" / "Peu compatible"
}
