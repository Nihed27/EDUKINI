package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.model.Notification;
import com.edukini.edukini_backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    /**
     * POST /api/notifications — Créer une notification (admin)
     * Body JSON : { "titre": "...", "message": "..." }
     */
    @PostMapping
    public ResponseEntity<Notification> creer(@RequestBody Notification notification) {
        Notification saved = notificationService.creer(notification);
        return ResponseEntity.ok(saved);
    }

    /**
     * GET /api/notifications — Récupérer toutes les notifications
     */
    @GetMapping
    public List<Notification> getAll() {
        return notificationService.getAll();
    }

    /**
     * PUT /api/notifications/{id}/lu — Marquer comme lue
     */
    @PutMapping("/{id}/lu")
    public ResponseEntity<Notification> marquerLu(@PathVariable Long id) {
        Notification updated = notificationService.marquerLu(id);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * GET /api/notifications/count — Nombre de notifications non lues
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countNonLues() {
        return ResponseEntity.ok(notificationService.countNonLues());
    }
}