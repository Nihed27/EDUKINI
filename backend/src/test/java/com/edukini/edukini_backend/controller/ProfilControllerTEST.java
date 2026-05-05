package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.service.ProfilService;
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

public class ProfilControllerTEST {

    private MockMvc mockMvc;

    @Mock
    private ProfilService profilService;

    @InjectMocks
    private ProfilController profilController;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(profilController).build();
    }

    @Test
    public void testGetAll() throws Exception {
        Mockito.when(profilService.findAll()).thenReturn(new ArrayList<>());
        mockMvc.perform(get("/api/profil")).andExpect(status().isOk());
    }
}
