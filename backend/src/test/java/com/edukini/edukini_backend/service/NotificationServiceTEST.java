package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.Notification;
import com.edukini.edukini_backend.repository.NotificationRepository;
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

public class NotificationServiceTEST {

    @Mock
    private NotificationRepository notificationRepository;

    @InjectMocks
    private NotificationService notificationService;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAll() {
        Mockito.when(notificationRepository.findByCibleOrderByCreatedAtDesc("ENICARTHAGE")).thenReturn(Arrays.asList(new Notification()));
        List<Notification> result = notificationService.getAll();
        Assert.assertEquals(1, result.size());
    }

    @Test
    public void testMarquerLu() {
        Notification n = new Notification();
        n.setId(1L);
        n.setLu(false);
        Mockito.when(notificationRepository.findById(1L)).thenReturn(Optional.of(n));
        Mockito.when(notificationRepository.save(Mockito.any(Notification.class))).thenReturn(n);

        Notification result = notificationService.marquerLu(1L);
        Assert.assertTrue(result.isLu());
    }
}
