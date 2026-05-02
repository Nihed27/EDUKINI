package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.EtudiantProfil;
import com.edukini.edukini_backend.repository.EtudiantProfilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EtudiantProfilService {

    @Autowired
    private EtudiantProfilRepository etudiantProfilRepository;

    public EtudiantProfil save(EtudiantProfil profil) {
        Optional<EtudiantProfil> existing = etudiantProfilRepository.findByEtudiantId(profil.getEtudiantId());
        if (existing.isPresent()) {
            profil.setId(existing.get().getId());
        }
        return etudiantProfilRepository.save(profil);
    }

    public Optional<EtudiantProfil> getByEtudiant(Long etudiantId) {
        return etudiantProfilRepository.findByEtudiantId(etudiantId);
    }
}
