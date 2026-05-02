package com.edukini.edukini_backend.repository;

import com.edukini.edukini_backend.model.NoteEtudiant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteEtudiantRepository extends JpaRepository<NoteEtudiant, Long> {
    List<NoteEtudiant> findByEtudiantId(Long etudiantId);
    void deleteByEtudiantId(Long etudiantId);
}
