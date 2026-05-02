package com.edukini.edukini_backend.repository;

import com.edukini.edukini_backend.model.EtudiantProfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EtudiantProfilRepository extends JpaRepository<EtudiantProfil, Long> {
    Optional<EtudiantProfil> findByEtudiantId(Long etudiantId);
}
