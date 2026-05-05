package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.model.Ecole;
import com.edukini.edukini_backend.service.EcoleService;
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

public class EcoleControllerTEST {

    private MockMvc mockMvc;

    @Mock
    private EcoleService ecoleService;

    @InjectMocks
    private EcoleController ecoleController;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(ecoleController).build();
    }

    @Test
    public void testGetAll() throws Exception {
        Mockito.when(ecoleService.findAll()).thenReturn(Arrays.asList(new Ecole()));

        mockMvc.perform(get("/api/ecoles"))
                .andExpect(status().isOk());
    }
}
