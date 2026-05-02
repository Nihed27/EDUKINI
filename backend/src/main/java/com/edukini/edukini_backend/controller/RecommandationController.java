package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.model.EtudiantProfil;
import com.edukini.edukini_backend.model.Recommandation;
import com.edukini.edukini_backend.service.EtudiantProfilService;
import com.edukini.edukini_backend.service.RecommandationIAService;
import com.edukini.edukini_backend.service.RecommandationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recommandations")
@CrossOrigin(origins = "*")
public class RecommandationController {

    @Autowired
    private RecommandationService recommandationService;

    @Autowired
    private RecommandationIAService recommandationIAService;

    @Autowired
    private EtudiantProfilService etudiantProfilService;

    @GetMapping("/{etudiantId}")
    public List<Recommandation> getByEtudiant(@PathVariable Long etudiantId) {
        return recommandationService.getByEtudiant(etudiantId);
    }

    @PostMapping("/calculer/{etudiantId}")
    public ResponseEntity<List<Recommandation>> calculer(@PathVariable Long etudiantId) {
        Optional<EtudiantProfil> profilOpt = etudiantProfilService.getByEtudiant(etudiantId);
        if (profilOpt.isPresent()) {
            List<Recommandation> result = recommandationIAService.calculerEtSauvegarder(profilOpt.get());
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/calculer")
    public List<Recommandation> calculerBody(@RequestBody EtudiantProfil profil) {
        return recommandationIAService.calculerEtSauvegarder(profil);
    }

    @DeleteMapping("/{id}")
    public void supprimer(@PathVariable Long id) {
        recommandationService.supprimer(id);
    }
}
