package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.Recommandation;
import com.edukini.edukini_backend.repository.RecommandationRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

public class RecommandationServiceTEST {

    @Mock
    private RecommandationRepository recommandationRepository;

    @InjectMocks
    private RecommandationService recommandationService;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetByEtudiant() {
        Mockito.when(recommandationRepository.findByEtudiantId(1L)).thenReturn(Arrays.asList(new Recommandation()));
        List<Recommandation> result = recommandationService.getByEtudiant(1L);
        Assert.assertEquals(1, result.size());
    }
}
