package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.model.ProfilCandidat;
import com.edukini.edukini_backend.service.ProfilCandidatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profil-candidat")
@CrossOrigin("*")
public class ProfilCandidatController {

    @Autowired
    private ProfilCandidatService service;

    @GetMapping("/{etudiantId}")
    public ResponseEntity<ProfilCandidat> getByEtudiantId(@PathVariable Long etudiantId) {
        return service.findByEtudiantId(etudiantId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ProfilCandidat create(@RequestBody ProfilCandidat profil) {
        return service.save(profil);
    }

    @PutMapping("/{etudiantId}")
    public ResponseEntity<ProfilCandidat> update(@PathVariable Long etudiantId, @RequestBody ProfilCandidat profil) {
        return service.findByEtudiantId(etudiantId)
                .map(existing -> {
                    existing.setLicence(profil.getLicence());
                    existing.setSpecialite(profil.getSpecialite());
                    existing.setMoyenne(profil.getMoyenne());
                    existing.setNiveauAnglais(profil.getNiveauAnglais());
                    existing.setCompetences(profil.getCompetences());
                    existing.setMotivation(profil.getMotivation());
                    return ResponseEntity.ok(service.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
