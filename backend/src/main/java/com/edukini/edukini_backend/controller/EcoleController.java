package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.model.Ecole;
import com.edukini.edukini_backend.service.EcoleService;
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
@RequestMapping("/api/ecoles")
@CrossOrigin("*")
public class EcoleController {

    @Autowired
    private EcoleService ecoleService;

    @GetMapping
    public List<Ecole> getAll() {
        return ecoleService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ecole> getById(@PathVariable Long id) {
        return ecoleService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Ecole create(@RequestBody Ecole ecole) {
        return ecoleService.save(ecole);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ecole> update(@PathVariable Long id, @RequestBody Ecole ecole) {
        return ecoleService.findById(id)
                .map(existing -> {
                    existing.setNom(ecole.getNom());
                    existing.setSigle(ecole.getSigle());
                    existing.setUniversite(ecole.getUniversite());
                    existing.setRegion(ecole.getRegion());
                    existing.setAdresse(ecole.getAdresse());
                    existing.setFilieres(ecole.getFilieres());
                    return ResponseEntity.ok(ecoleService.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (ecoleService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        ecoleService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
