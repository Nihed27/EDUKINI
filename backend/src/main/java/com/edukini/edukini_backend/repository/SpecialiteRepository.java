// C:/Users/MSI/EDUKINI/backend/src/main/java/com/edukini/edukini_backend/repository/SpecialiteRepository.java
package com.edukini.edukini_backend.repository;

import com.edukini.edukini_backend.model.Specialite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialiteRepository extends JpaRepository<Specialite, Long> {
}
