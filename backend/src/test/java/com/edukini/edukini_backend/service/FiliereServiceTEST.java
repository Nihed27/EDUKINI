package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.Filiere;
import com.edukini.edukini_backend.repository.FiliereRepository;
import com.edukini.edukini_backend.repository.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class FiliereServiceTEST {

    @Mock
    private FiliereRepository filiereRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private FiliereService filiereService;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        List<Filiere> filieres = new ArrayList<>();
        filieres.add(new Filiere());
        Mockito.when(filiereRepository.findAll()).thenReturn(filieres);

        List<Filiere> result = filiereService.findAll();
        Assert.assertEquals(1, result.size());
    }

    @Test
    public void testFindById() {
        Filiere f = new Filiere();
        f.setId(1L);
        Mockito.when(filiereRepository.findById(1L)).thenReturn(Optional.of(f));

        Optional<Filiere> result = filiereService.findById(1L);
        Assert.assertTrue(result.isPresent());
        Assert.assertEquals(Long.valueOf(1L), result.get().getId());
    }
}
