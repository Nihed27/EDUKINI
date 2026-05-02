package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.EduNote;
import com.edukini.edukini_backend.repository.EduNoteRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EduNoteService {

    @Autowired
    private EduNoteRepository repo;

    public List<EduNote> findByEtudiantId(Long etudiantId) {
        return repo.findByEtudiantId(etudiantId);
    }

    @Transactional
    public List<EduNote> saveAll(List<EduNote> notes) {
        return repo.saveAll(notes);
    }

    @Transactional
    public void deleteByEtudiantId(Long etudiantId) {
        repo.deleteByEtudiantId(etudiantId);
    }
}
