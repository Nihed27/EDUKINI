package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.Specialite;
import com.edukini.edukini_backend.repository.SpecialiteRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class SpecialiteServiceTEST {

    @Mock
    private SpecialiteRepository specialiteRepository;

    @InjectMocks
    private SpecialiteService specialiteService;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        Mockito.when(specialiteRepository.findAll()).thenReturn(Arrays.asList(new Specialite(), new Specialite()));
        List<Specialite> result = specialiteService.findAll();
        Assert.assertEquals(2, result.size());
    }

    @Test
    public void testFindById() {
        Specialite s = new Specialite();
        s.setId(1L);
        Mockito.when(specialiteRepository.findById(1L)).thenReturn(Optional.of(s));
        Optional<Specialite> result = specialiteService.findById(1L);
        Assert.assertTrue(result.isPresent());
        Assert.assertEquals(Long.valueOf(1L), result.get().getId());
    }
}
