// C:/Users/MSI/EDUKINI/backend/src/main/java/com/edukini/edukini_backend/service/FiliereService.java
package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.Filiere;
import com.edukini.edukini_backend.repository.FiliereRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FiliereService {

    @Autowired
    private FiliereRepository filiereRepository;

    public List<Filiere> findAll() {
        return filiereRepository.findAll();
    }

    public Optional<Filiere> findById(Long id) {
        return filiereRepository.findById(id);
    }

    public Filiere save(Filiere filiere) {
        return filiereRepository.save(filiere);
    }

    public void deleteById(Long id) {
        filiereRepository.deleteById(id);
    }
}
