package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.model.EtudiantProfil;
import com.edukini.edukini_backend.service.EtudiantProfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/etudiant-profil")
@CrossOrigin(origins = "*")
public class EtudiantProfilController {

    @Autowired
    private EtudiantProfilService etudiantProfilService;

    @PostMapping
    public EtudiantProfil save(@RequestBody EtudiantProfil profil) {
        return etudiantProfilService.save(profil);
    }

    @GetMapping("/{etudiantId}")
    public ResponseEntity<EtudiantProfil> getByEtudiant(@PathVariable Long etudiantId) {
        return etudiantProfilService.getByEtudiant(etudiantId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
