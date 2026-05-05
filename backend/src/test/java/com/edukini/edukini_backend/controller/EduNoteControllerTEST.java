package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.service.EduNoteService;
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

public class EduNoteControllerTEST {

    private MockMvc mockMvc;

    @Mock
    private EduNoteService noteService;

    @InjectMocks
    private EduNoteController eduNoteController;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(eduNoteController).build();
    }

    @Test
    public void testGetNotes() throws Exception {
        Mockito.when(noteService.findByEtudiantId(1L)).thenReturn(new ArrayList<>());
        mockMvc.perform(get("/api/notes/1")).andExpect(status().isOk());
    }
}
