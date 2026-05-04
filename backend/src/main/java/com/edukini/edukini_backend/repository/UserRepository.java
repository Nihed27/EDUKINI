package com.edukini.edukini_backend.repository;

import com.edukini.edukini_backend.model.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByResetToken(String token);

    @Query("SELECT COUNT(u) FROM User u WHERE u.role = 'ROLE_STUDENT' OR u.role = 'STUDENT'")
    long countRegisteredStudents();

    @Query("SELECT COUNT(u) FROM User u WHERE (u.role = 'ROLE_STUDENT' OR u.role = 'STUDENT') AND u.filiereId = :filiereId")
    long countRegisteredStudentsForFiliere(@Param(
        "filiereId") Long filiereId);
}