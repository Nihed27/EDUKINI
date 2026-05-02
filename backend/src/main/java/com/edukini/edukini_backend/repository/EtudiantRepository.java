// C:/Users/MSI/EDUKINI/backend/src/main/java/com/edukini/edukini_backend/repository/EtudiantRepository.java
package com.edukini.edukini_backend.repository;

import com.edukini.edukini_backend.model.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
}
