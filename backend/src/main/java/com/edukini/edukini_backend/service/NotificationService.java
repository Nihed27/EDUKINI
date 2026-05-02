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

    public List<Notification> getByEtudiant(Long etudiantId) {
        return notificationRepository.findByEtudiantId(etudiantId);
    }

    public Notification marquerLu(Long id) {
        Optional<Notification> notificationOpt = notificationRepository.findById(id);
        if (notificationOpt.isPresent()) {
            Notification notification = notificationOpt.get();
            notification.setLu(true);
            return notificationRepository.save(notification);
        }
        return null;
    }

    public void marquerToutLu(Long etudiantId) {
        List<Notification> notifications = notificationRepository.findByEtudiantId(etudiantId);
        notifications.forEach(n -> n.setLu(true));
        notificationRepository.saveAll(notifications);
    }

    public void supprimer(Long id) {
        notificationRepository.deleteById(id);
    }
}
