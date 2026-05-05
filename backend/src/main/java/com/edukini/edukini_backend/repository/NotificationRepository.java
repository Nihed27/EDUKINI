package com.edukini.edukini_backend.repository;

import com.edukini.edukini_backend.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Récupérer les notifications par cible (ex: "ENICARTHAGE"), triées par date desc
    List<Notification> findByCibleOrderByCreatedAtDesc(String cible);

    // Compter les notifications non lues pour une cible
    long countByCibleAndLuFalse(String cible);
}
