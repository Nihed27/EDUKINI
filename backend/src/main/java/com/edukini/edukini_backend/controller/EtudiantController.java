package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.model.Etudiant;
import com.edukini.edukini_backend.service.EtudiantService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/etudiants")
@CrossOrigin("*")
public class EtudiantController {

    @Autowired
    private EtudiantService etudiantService;

    @GetMapping
    public List<Etudiant> getAll() {
        return etudiantService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Etudiant> getById(@PathVariable Long id) {
        return etudiantService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Etudiant create(@RequestBody Etudiant etudiant) {
        return etudiantService.save(etudiant);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Etudiant> update(@PathVariable Long id, @RequestBody Etudiant etudiant) {
        return etudiantService.findById(id)
                .map(existing -> {
                    existing.setNom(etudiant.getNom());
                    existing.setPrenom(etudiant.getPrenom());
                    existing.setEmail(etudiant.getEmail());
                    existing.setPassword(etudiant.getPassword());
                    existing.setFiliere(etudiant.getFiliere());
                    existing.setAnnee(etudiant.getAnnee());
                    existing.setEtablissement(etudiant.getEtablissement());
                    return ResponseEntity.ok(etudiantService.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (etudiantService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        etudiantService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
