package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.service.ProfilCandidatService;
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

public class ProfilCandidatControllerTEST {

    private MockMvc mockMvc;

    @Mock
    private ProfilCandidatService service;

    @InjectMocks
    private ProfilCandidatController profilCandidatController;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(profilCandidatController).build();
    }

    @Test
    public void testGetByEtudiantId() throws Exception {
        Mockito.when(service.findByEtudiantId(1L)).thenReturn(Optional.empty());
        mockMvc.perform(get("/api/profil-candidat/1")).andExpect(status().isNotFound());
    }
}
