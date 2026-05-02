package com.edukini.edukini_backend.repository;

import com.edukini.edukini_backend.model.ProfilCandidat;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfilCandidatRepository extends JpaRepository<ProfilCandidat, Long> {
    Optional<ProfilCandidat> findByEtudiantId(Long etudiantId);
}
