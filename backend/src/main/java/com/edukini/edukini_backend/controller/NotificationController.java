package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.model.Notification;
import com.edukini.edukini_backend.service.NotificationService;
import com.edukini.edukini_backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private NotificationRepository notificationRepository;

    @GetMapping("/{etudiantId}")
    public List<Notification> getByEtudiant(@PathVariable Long etudiantId) {
        return notificationService.getByEtudiant(etudiantId);
    }

    @PostMapping
    public ResponseEntity<Notification> creer(@RequestBody Notification notification) {
        notification.setDateEnvoi(LocalDateTime.now());
        return ResponseEntity.ok(notificationRepository.save(notification));
    }

    @PutMapping("/{id}/lu")
    public ResponseEntity<Notification> marquerLu(@PathVariable Long id) {
        Notification updated = notificationService.marquerLu(id);
        if (updated != null) return ResponseEntity.ok(updated);
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/tout-marquer-lu/{etudiantId}")
    public ResponseEntity<Void> marquerToutLu(@PathVariable Long etudiantId) {
        notificationService.marquerToutLu(etudiantId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimer(@PathVariable Long id) {
        notificationService.supprimer(id);
        return ResponseEntity.ok().build();
    }
}