package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.Ecole;
import com.edukini.edukini_backend.repository.EcoleRepository;
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

public class EcoleServiceTEST {

    @Mock
    private EcoleRepository ecoleRepository;

    @InjectMocks
    private EcoleService ecoleService;

    private AutoCloseable closeable;

    @Before
    public void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        Ecole e1 = new Ecole();
        Ecole e2 = new Ecole();
        Mockito.when(ecoleRepository.findAll()).thenReturn(Arrays.asList(e1, e2));

        List<Ecole> result = ecoleService.findAll();

        Assert.assertEquals(2, result.size());
    }

    @Test
    public void testFindById() {
        Ecole e = new Ecole();
        e.setId(1L);
        Mockito.when(ecoleRepository.findById(1L)).thenReturn(Optional.of(e));

        Optional<Ecole> result = ecoleService.findById(1L);

        Assert.assertTrue(result.isPresent());
        Assert.assertEquals(Long.valueOf(1L), result.get().getId());
    }
}
