package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.ProfilCandidat;
import com.edukini.edukini_backend.repository.ProfilCandidatRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfilCandidatService {

    @Autowired
    private ProfilCandidatRepository repo;

    public Optional<ProfilCandidat> findByEtudiantId(Long etudiantId) {
        return repo.findByEtudiantId(etudiantId);
    }

    public ProfilCandidat save(ProfilCandidat profil) {
        return repo.save(profil);
    }
}
