package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.service.EtudiantProfilService;
import com.edukini.edukini_backend.service.RecommandationIAService;
import com.edukini.edukini_backend.service.RecommandationService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class RecommandationControllerTEST {

    private MockMvc mockMvc;

    @Mock
    private RecommandationService recommandationService;

    @Mock
    private RecommandationIAService recommandationIAService;

    @Mock
    private EtudiantProfilService etudiantProfilService;

    @InjectMocks
    private RecommandationController recommandationController;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(recommandationController).build();
    }

    @Test
    public void testGetByEtudiant() throws Exception {
        Mockito.when(recommandationService.getByEtudiant(1L)).thenReturn(new ArrayList<>());
        mockMvc.perform(get("/api/recommandations/1")).andExpect(status().isOk());
    }
}
