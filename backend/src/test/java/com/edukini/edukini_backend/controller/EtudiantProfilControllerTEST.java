package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.service.EtudiantProfilService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class EtudiantProfilControllerTEST {

    private MockMvc mockMvc;

    @Mock
    private EtudiantProfilService etudiantProfilService;

    @InjectMocks
    private EtudiantProfilController etudiantProfilController;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(etudiantProfilController).build();
    }

    @Test
    public void testGetByEtudiant() throws Exception {
        Mockito.when(etudiantProfilService.getByEtudiant(1L)).thenReturn(Optional.empty());
        mockMvc.perform(get("/api/etudiant-profil/1")).andExpect(status().isNotFound());
    }
}
