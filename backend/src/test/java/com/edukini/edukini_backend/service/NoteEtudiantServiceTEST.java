package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.NoteEtudiant;
import com.edukini.edukini_backend.repository.NoteEtudiantRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

public class NoteEtudiantServiceTEST {

    @Mock
    private NoteEtudiantRepository noteRepository;

    @InjectMocks
    private NoteEtudiantService noteEtudiantService;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindByEtudiantId() {
        NoteEtudiant n = new NoteEtudiant();
        Mockito.when(noteRepository.findByEtudiantId(5L)).thenReturn(Arrays.asList(n));
        List<NoteEtudiant> result = noteEtudiantService.findByEtudiantId(5L);
        Assert.assertEquals(1, result.size());
    }
}
