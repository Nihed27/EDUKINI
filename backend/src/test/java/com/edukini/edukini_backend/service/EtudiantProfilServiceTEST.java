package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.EtudiantProfil;
import com.edukini.edukini_backend.repository.EtudiantProfilRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

public class EtudiantProfilServiceTEST {

    @Mock
    private EtudiantProfilRepository etudiantProfilRepository;

    @InjectMocks
    private EtudiantProfilService etudiantProfilService;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetByEtudiant() {
        EtudiantProfil p = new EtudiantProfil();
        Mockito.when(etudiantProfilRepository.findByEtudiantId(1L)).thenReturn(Optional.of(p));
        Optional<EtudiantProfil> result = etudiantProfilService.getByEtudiant(1L);
        Assert.assertTrue(result.isPresent());
    }
}
