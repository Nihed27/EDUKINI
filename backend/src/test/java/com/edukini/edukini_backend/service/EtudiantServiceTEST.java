package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.Etudiant;
import com.edukini.edukini_backend.repository.EtudiantRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class EtudiantServiceTEST {

    @Mock
    private EtudiantRepository etudiantRepository;

    @InjectMocks
    private EtudiantService etudiantService;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        Mockito.when(etudiantRepository.findAll()).thenReturn(Arrays.asList(new Etudiant(), new Etudiant()));
        List<Etudiant> result = etudiantService.findAll();
        Assert.assertEquals(2, result.size());
    }

    @Test
    public void testFindById() {
        Etudiant e = new Etudiant();
        e.setId(10L);
        Mockito.when(etudiantRepository.findById(10L)).thenReturn(Optional.of(e));
        Optional<Etudiant> result = etudiantService.findById(10L);
        Assert.assertTrue(result.isPresent());
        Assert.assertEquals(Long.valueOf(10L), result.get().getId());
    }
}
