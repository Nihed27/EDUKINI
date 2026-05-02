package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.model.EduNote;
import com.edukini.edukini_backend.service.EduNoteService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin("*")
public class EduNoteController {

    @Autowired
    private EduNoteService noteService;

    @GetMapping("/{etudiantId}")
    public List<EduNote> getNotes(@PathVariable Long etudiantId) {
        return noteService.findByEtudiantId(etudiantId);
    }

    @PostMapping
    public List<EduNote> saveNotes(@RequestBody List<EduNote> notes) {
        return noteService.saveAll(notes);
    }

    @DeleteMapping("/{etudiantId}")
    public ResponseEntity<Void> deleteNotes(@PathVariable Long etudiantId) {
        noteService.deleteByEtudiantId(etudiantId);
        return ResponseEntity.noContent().build();
    }
}
