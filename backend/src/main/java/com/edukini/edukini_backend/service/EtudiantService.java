// C:/Users/MSI/EDUKINI/backend/src/main/java/com/edukini/edukini_backend/service/EtudiantService.java
package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.Etudiant;
import com.edukini.edukini_backend.repository.EtudiantRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EtudiantService {

    @Autowired
    private EtudiantRepository etudiantRepository;

    public List<Etudiant> findAll() {
        return etudiantRepository.findAll();
    }

    public Optional<Etudiant> findById(Long id) {
        return etudiantRepository.findById(id);
    }

    public Etudiant save(Etudiant etudiant) {
        return etudiantRepository.save(etudiant);
    }

    public void deleteById(Long id) {
        etudiantRepository.deleteById(id);
    }
}
