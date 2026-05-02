// C:/Users/MSI/EDUKINI/backend/src/main/java/com/edukini/edukini_backend/repository/EcoleRepository.java
package com.edukini.edukini_backend.repository;

import com.edukini.edukini_backend.model.Ecole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EcoleRepository extends JpaRepository<Ecole, Long> {
}
