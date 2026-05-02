package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.Recommandation;
import com.edukini.edukini_backend.repository.RecommandationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommandationService {

    @Autowired
    private RecommandationRepository recommandationRepository;

    public List<Recommandation> getByEtudiant(Long etudiantId) {
        return recommandationRepository.findByEtudiantId(etudiantId);
    }

    public Recommandation creer(Recommandation r) {
        return recommandationRepository.save(r);
    }

    public void supprimer(Long id) {
        recommandationRepository.deleteById(id);
    }
}
