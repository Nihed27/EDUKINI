package com.edukini.edukini_backend.repository;

import com.edukini.edukini_backend.model.Recommandation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommandationRepository extends JpaRepository<Recommandation, Long> {
    List<Recommandation> findByEtudiantId(Long etudiantId);
}
