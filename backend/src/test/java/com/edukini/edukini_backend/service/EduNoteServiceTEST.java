package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.EduNote;
import com.edukini.edukini_backend.repository.EduNoteRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

public class EduNoteServiceTEST {

    @Mock
    private EduNoteRepository repo;

    @InjectMocks
    private EduNoteService eduNoteService;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindByEtudiantId() {
        EduNote n = new EduNote();
        Mockito.when(repo.findByEtudiantId(1L)).thenReturn(Arrays.asList(n));
        List<EduNote> result = eduNoteService.findByEtudiantId(1L);
        Assert.assertEquals(1, result.size());
    }
}
