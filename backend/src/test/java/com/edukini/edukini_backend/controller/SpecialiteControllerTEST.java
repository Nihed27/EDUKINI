package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.service.SpecialiteService;
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

public class SpecialiteControllerTEST {

    private MockMvc mockMvc;

    @Mock
    private SpecialiteService specialiteService;

    @InjectMocks
    private SpecialiteController specialiteController;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(specialiteController).build();
    }

    @Test
    public void testGetAll() throws Exception {
        Mockito.when(specialiteService.findAll()).thenReturn(new ArrayList<>());
        mockMvc.perform(get("/api/specialites")).andExpect(status().isOk());
    }
}
