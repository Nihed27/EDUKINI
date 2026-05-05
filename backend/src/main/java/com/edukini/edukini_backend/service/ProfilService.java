package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.Profil;
import com.edukini.edukini_backend.repository.ProfilRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfilService {

    @Autowired
    private ProfilRepository profilRepository;

    public List<Profil> findAll() {
        return profilRepository.findAll();
    }

    public Optional<Profil> findById(Long id) {
        return profilRepository.findById(id);
    }

    public Optional<Profil> findByEtudiantId(Long etudiantId) {
        List<Profil> results = profilRepository.findByEtudiantIdOrderByIdDesc(etudiantId);
        return results.isEmpty() ? Optional.empty() : Optional.of(results.get(0));
    }

    public Profil save(Profil profil) {
        return profilRepository.save(profil);
    }

    public void deleteById(Long id) {
        profilRepository.deleteById(id);
    }
}
