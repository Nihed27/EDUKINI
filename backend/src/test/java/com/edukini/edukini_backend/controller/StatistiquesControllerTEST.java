package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.repository.RecommandationRepository;
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

public class StatistiquesControllerTEST {

    private MockMvc mockMvc;

    @Mock
    private RecommandationRepository recommandationRepository;

    @InjectMocks
    private StatistiquesController statistiquesController;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(statistiquesController).build();
    }

    @Test
    public void testGetOrientationStats() throws Exception {
        Mockito.when(recommandationRepository.findAll()).thenReturn(new ArrayList<>());

        mockMvc.perform(get("/api/statistiques/orientation"))
                .andExpect(status().isOk());
    }
}
