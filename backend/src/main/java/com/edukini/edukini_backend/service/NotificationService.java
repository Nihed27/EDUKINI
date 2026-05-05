package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.model.Notification;
import com.edukini.edukini_backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    /**
     * Créer une notification (envoyée par l'admin)
     */
    public Notification creer(Notification notification) {
        return notificationRepository.save(notification);
    }

    /**
     * Récupérer toutes les notifications (triées par date décroissante)
     */
    public List<Notification> getAll() {
        return notificationRepository.findByCibleOrderByCreatedAtDesc("ENICARTHAGE");
    }

    /**
     * Marquer une notification comme lue
     */
    public Notification marquerLu(Long id) {
        Optional<Notification> opt = notificationRepository.findById(id);
        if (opt.isPresent()) {
            Notification notification = opt.get();
            notification.setLu(true);
            return notificationRepository.save(notification);
        }
        return null;
    }

    /**
     * Compter les notifications non lues
     */
    public long countNonLues() {
        return notificationRepository.countByCibleAndLuFalse("ENICARTHAGE");
    }
}
