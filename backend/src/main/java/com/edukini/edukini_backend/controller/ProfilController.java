package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.model.Profil;
import com.edukini.edukini_backend.service.ProfilService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profil")
@CrossOrigin("*")
public class ProfilController {

    @Autowired
    private ProfilService profilService;

    @GetMapping
    public List<Profil> getAll() {
        return profilService.findAll();
    }

    @GetMapping("/etudiant/{etudiantId}")
    public ResponseEntity<Profil> getByEtudiantId(@PathVariable Long etudiantId) {
        return profilService.findByEtudiantId(etudiantId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profil> getById(@PathVariable Long id) {
        return profilService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Profil create(@RequestBody Profil profil) {
        if (profil.getEtudiantId() != null) {
            return profilService.findByEtudiantId(profil.getEtudiantId())
                    .map(existing -> {
                        updateFields(existing, profil);
                        return profilService.save(existing);
                    })
                    .orElseGet(() -> profilService.save(profil));
        }
        return profilService.save(profil);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profil> update(@PathVariable Long id, @RequestBody Profil profil) {
        return profilService.findById(id)
                .map(existing -> {
                    updateFields(existing, profil);
                    return ResponseEntity.ok(profilService.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/etudiant/{etudiantId}")
    public ResponseEntity<Profil> updateByEtudiantId(@PathVariable Long etudiantId, @RequestBody Profil profil) {
        return profilService.findByEtudiantId(etudiantId)
                .map(existing -> {
                    updateFields(existing, profil);
                    return ResponseEntity.ok(profilService.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private void updateFields(Profil existing, Profil profil) {
        existing.setNom(profil.getNom());
        existing.setPrenom(profil.getPrenom());
        existing.setEmail(profil.getEmail());
        existing.setAdresse(profil.getAdresse());
        existing.setNomPrepa(profil.getNomPrepa());
        existing.setTelephone(profil.getTelephone());
        existing.setRang(profil.getRang());
        existing.setScore(profil.getScore());
        existing.setFiliere(profil.getFiliere());
        existing.setNotes(profil.getNotes());
        existing.setEtudiantId(profil.getEtudiantId());
    }
}
