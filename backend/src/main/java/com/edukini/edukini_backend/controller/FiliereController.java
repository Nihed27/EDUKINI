package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.dto.StudentCountsDto;
import com.edukini.edukini_backend.model.Filiere;
import com.edukini.edukini_backend.service.FiliereService;
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
@RequestMapping("/api/filieres")
@CrossOrigin("*")
public class FiliereController {

    @Autowired
    private FiliereService filiereService;

    @GetMapping
    public List<Filiere> getAll() {
        return filiereService.findAll();
    }

    @GetMapping("/enrollment-stats")
    public StudentCountsDto enrollmentStats() {
        return filiereService.getStudentEnrollmentCounts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Filiere> getById(@PathVariable Long id) {
        return filiereService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Filiere create(@RequestBody Filiere filiere) {
        return filiereService.save(filiere);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Filiere> update(@PathVariable Long id, @RequestBody Filiere filiere) {
        return filiereService.findById(id)
                .map(existing -> {
                    existing.setNom(filiere.getNom());
                    existing.setCode(filiere.getCode());
                    existing.setIcon(filiere.getIcon());
                    existing.setCouleur(filiere.getCouleur());
                    existing.setDescription(filiere.getDescription());
                    existing.setCapacite(filiere.getCapacite());
                    existing.setScoreMin(filiere.getScoreMin());
                    existing.setDuree(filiere.getDuree());
                    existing.setActif(filiere.getActif());
                    existing.setDebouches(filiere.getDebouches());
                    existing.setCompetences(filiere.getCompetences());
                    return ResponseEntity.ok(filiereService.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (filiereService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        filiereService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
