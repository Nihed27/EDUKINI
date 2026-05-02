package com.edukini.edukini_backend.repository;

import com.edukini.edukini_backend.model.EduNote;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EduNoteRepository extends JpaRepository<EduNote, Long> {
    List<EduNote> findByEtudiantId(Long etudiantId);
    void deleteByEtudiantId(Long etudiantId);
}
