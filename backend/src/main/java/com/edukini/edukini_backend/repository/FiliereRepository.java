// C:/Users/MSI/EDUKINI/backend/src/main/java/com/edukini/edukini_backend/repository/FiliereRepository.java
package com.edukini.edukini_backend.repository;

import com.edukini.edukini_backend.model.Filiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FiliereRepository extends JpaRepository<Filiere, Long> {
}
