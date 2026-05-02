// C:/Users/MSI/EDUKINI/backend/src/main/java/com/edukini/edukini_backend/service/EcoleService.java
package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.Ecole;
import com.edukini.edukini_backend.repository.EcoleRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EcoleService {

    @Autowired
    private EcoleRepository ecoleRepository;

    public List<Ecole> findAll() {
        return ecoleRepository.findAll();
    }

    public Optional<Ecole> findById(Long id) {
        return ecoleRepository.findById(id);
    }

    public Ecole save(Ecole ecole) {
        return ecoleRepository.save(ecole);
    }

    public void deleteById(Long id) {
        ecoleRepository.deleteById(id);
    }
}
