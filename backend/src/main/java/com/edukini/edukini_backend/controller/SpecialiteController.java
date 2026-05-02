package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.model.Specialite;
import com.edukini.edukini_backend.service.SpecialiteService;
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
@RequestMapping("/api/specialites")
@CrossOrigin("*")
public class SpecialiteController {

    @Autowired
    private SpecialiteService specialiteService;

    @GetMapping
    public List<Specialite> getAll() {
        return specialiteService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Specialite> getById(@PathVariable Long id) {
        return specialiteService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Specialite create(@RequestBody Specialite specialite) {
        return specialiteService.save(specialite);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Specialite> update(@PathVariable Long id, @RequestBody Specialite specialite) {
        return specialiteService.findById(id)
                .map(existing -> {
                    existing.setNom(specialite.getNom());
                    existing.setCode(specialite.getCode());
                    existing.setIcon(specialite.getIcon());
                    existing.setFiliereId(specialite.getFiliereId());
                    existing.setDescription(specialite.getDescription());
                    existing.setCapacite(specialite.getCapacite());
                    existing.setAnnee(specialite.getAnnee());
                    existing.setActif(specialite.getActif());
                    existing.setDebouches(specialite.getDebouches());
                    existing.setCompetences(specialite.getCompetences());
                    return ResponseEntity.ok(specialiteService.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (specialiteService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        specialiteService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
