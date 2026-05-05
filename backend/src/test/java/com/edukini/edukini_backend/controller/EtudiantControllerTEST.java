package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.model.Etudiant;
import com.edukini.edukini_backend.service.EtudiantService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class EtudiantControllerTEST {

    private MockMvc mockMvc;

    @Mock
    private EtudiantService etudiantService;

    @InjectMocks
    private EtudiantController etudiantController;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(etudiantController).build();
    }

    @Test
    public void testGetAll() throws Exception {
        Mockito.when(etudiantService.findAll()).thenReturn(Arrays.asList(new Etudiant()));

        mockMvc.perform(get("/api/etudiants"))
                .andExpect(status().isOk());
    }
}
