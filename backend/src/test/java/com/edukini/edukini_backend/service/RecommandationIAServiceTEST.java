package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.EtudiantProfil;
import com.edukini.edukini_backend.model.Recommandation;
import com.edukini.edukini_backend.repository.RecommandationRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

public class RecommandationIAServiceTEST {

    @Mock
    private RecommandationRepository recommandationRepository;

    @InjectMocks
    private RecommandationIAService recommandationIAService;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCalculerEtSauvegarder() {
        EtudiantProfil profil = new EtudiantProfil();
        profil.setEtudiantId(1L);
        profil.setNoteMaths(15.0);
        profil.setNoteInformatique(16.0);
        profil.setNoteAnglais(14.0);
        profil.setMoyenneGenerale(15.0);

        Mockito.when(recommandationRepository.findByEtudiantId(1L)).thenReturn(new ArrayList<>());
        Mockito.when(recommandationRepository.saveAll(Mockito.anyList())).thenAnswer(i -> i.getArguments()[0]);

        List<Recommandation> result = recommandationIAService.calculerEtSauvegarder(profil);

        Assert.assertEquals(3, result.size());
        Assert.assertNotNull(result.get(0).getLabel());
    }
}
