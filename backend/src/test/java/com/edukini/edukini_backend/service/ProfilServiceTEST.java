package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.Profil;
import com.edukini.edukini_backend.repository.ProfilRepository;
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

public class ProfilServiceTEST {

    @Mock
    private ProfilRepository profilRepository;

    @InjectMocks
    private ProfilService profilService;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        Mockito.when(profilRepository.findAll()).thenReturn(Arrays.asList(new Profil(), new Profil()));
        List<Profil> result = profilService.findAll();
        Assert.assertEquals(2, result.size());
    }

    @Test
    public void testFindById() {
        Profil p = new Profil();
        p.setId(1L);
        Mockito.when(profilRepository.findById(1L)).thenReturn(Optional.of(p));
        Optional<Profil> result = profilService.findById(1L);
        Assert.assertTrue(result.isPresent());
        Assert.assertEquals(Long.valueOf(1L), result.get().getId());
    }
}
