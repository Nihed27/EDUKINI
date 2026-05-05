package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.ProfilCandidat;
import com.edukini.edukini_backend.repository.ProfilCandidatRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

public class ProfilCandidatServiceTEST {

    @Mock
    private ProfilCandidatRepository repo;

    @InjectMocks
    private ProfilCandidatService profilCandidatService;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindByEtudiantId() {
        ProfilCandidat p = new ProfilCandidat();
        Mockito.when(repo.findByEtudiantId(1L)).thenReturn(Optional.of(p));
        Optional<ProfilCandidat> result = profilCandidatService.findByEtudiantId(1L);
        Assert.assertTrue(result.isPresent());
    }
}
