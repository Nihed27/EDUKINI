// C:/Users/MSI/EDUKINI/backend/src/main/java/com/edukini/edukini_backend/service/SpecialiteService.java
package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.Specialite;
import com.edukini.edukini_backend.repository.SpecialiteRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SpecialiteService {

    @Autowired
    private SpecialiteRepository specialiteRepository;

    public List<Specialite> findAll() {
        return specialiteRepository.findAll();
    }

    public Optional<Specialite> findById(Long id) {
        return specialiteRepository.findById(id);
    }

    public Specialite save(Specialite specialite) {
        return specialiteRepository.save(specialite);
    }

    public void deleteById(Long id) {
        specialiteRepository.deleteById(id);
    }
}
