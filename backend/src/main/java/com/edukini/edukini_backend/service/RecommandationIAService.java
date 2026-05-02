package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.EtudiantProfil;
import com.edukini.edukini_backend.model.Recommandation;
import com.edukini.edukini_backend.repository.RecommandationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommandationIAService {

    @Autowired
    private RecommandationRepository recommandationRepository;

    public List<Recommandation> calculerEtSauvegarder(EtudiantProfil profil) {
        List<Recommandation> recommandations = new ArrayList<>();

        // 1. Calcul des scores pour chaque spécialité
        recommandations.add(calculerPourSpec(profil, "Génie Logiciel (GL)", "ENICarthage"));
        recommandations.add(calculerPourSpec(profil, "Réseaux et Systèmes de Communication (RSC)", "ENICarthage"));
        recommandations.add(calculerPourSpec(profil, "Électronique et Systèmes Embarqués (ESE)", "ENICarthage"));

        // 2. Supprimer les anciennes recommandations pour cet étudiant
        List<Recommandation> anciennes = recommandationRepository.findByEtudiantId(profil.getEtudiantId());
        recommandationRepository.deleteAll(anciennes);

        // 3. Trier par score décroissant et sauvegarder
        List<Recommandation> triees = recommandations.stream()
                .sorted(Comparator.comparingInt(Recommandation::getScore).reversed())
                .collect(Collectors.toList());

        return recommandationRepository.saveAll(triees);
    }

    private Recommandation calculerPourSpec(EtudiantProfil profil, String spec, String ecole) {
        double rawScore = 0;

        switch (spec) {
            case "Génie Logiciel (GL)":
                rawScore = (profil.getNoteMaths() * 0.35) + (profil.getNoteInformatique() * 0.35) + 
                           (profil.getNoteAnglais() * 0.15) + (profil.getMoyenneGenerale() * 0.15);
                break;
            case "Réseaux et Systèmes de Communication (RSC)":
                rawScore = (profil.getNotePhysique() * 0.30) + (profil.getNoteReseaux() * 0.30) + 
                           (profil.getNoteMaths() * 0.25) + (profil.getMoyenneGenerale() * 0.15);
                break;
            case "Électronique et Systèmes Embarqués (ESE)":
                rawScore = (profil.getNotePhysique() * 0.35) + (profil.getNoteElectronique() * 0.35) + 
                           (profil.getNoteMaths() * 0.20) + (profil.getMoyenneGenerale() * 0.10);
                break;
        }

        int scoreFinal = (int) (rawScore * 5); // Normalisation sur 100 (si notes sur 20)
        if (scoreFinal > 100) scoreFinal = 100;

        Recommandation r = new Recommandation();
        r.setSpecialite(spec);
        r.setEcole(ecole);
        r.setScore(scoreFinal);
        r.setEtudiantId(profil.getEtudiantId());
        r.setPlacesDisponibles(30 + (int)(Math.random() * 20)); // Simulation
        r.setRangMinimum(100 + (int)(Math.random() * 500)); // Simulation
        
        if (scoreFinal >= 75) r.setLabel("Recommandé");
        else if (scoreFinal >= 50) r.setLabel("Compatible");
        else r.setLabel("Peu compatible");

        return r;
    }
}
