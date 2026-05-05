package com.edukini.edukini_backend.repository;

import com.edukini.edukini_backend.model.Profil;
import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfilRepository extends JpaRepository<Profil, Long> {
    List<Profil> findByEtudiantIdOrderByIdDesc(Long etudiantId);
}
