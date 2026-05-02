package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.NoteEtudiant;
import com.edukini.edukini_backend.repository.NoteEtudiantRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NoteEtudiantService {

    @Autowired
    private NoteEtudiantRepository noteRepository;

    public List<NoteEtudiant> findByEtudiantId(Long etudiantId) {
        return noteRepository.findByEtudiantId(etudiantId);
    }

    @Transactional
    public List<NoteEtudiant> saveAll(List<NoteEtudiant> notes) {
        return noteRepository.saveAll(notes);
    }

    @Transactional
    public void deleteByEtudiantId(Long etudiantId) {
        noteRepository.deleteByEtudiantId(etudiantId);
    }
}
