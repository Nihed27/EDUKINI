package com.edukini.edukini_backend.config;

import com.edukini.edukini_backend.model.User;
import com.edukini.edukini_backend.repository.UserRepository;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordHashMigrationRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(PasswordHashMigrationRunner.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public PasswordHashMigrationRunner(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        List<User> users = userRepository.findAll();
        int migrated = 0;

        for (User user : users) {
            String password = user.getPassword();
            if (password == null || password.isBlank()) {
                continue;
            }

            if (isBcryptHash(password)) {
                continue;
            }

            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
            migrated++;
        }

        if (migrated > 0) {
            logger.info("Password hash migration completed. Migrated {} user(s).", migrated);
        } else {
            logger.info("Password hash migration: no plain-text password found.");
        }
    }

    private boolean isBcryptHash(String value) {
        return value.startsWith("$2a$") || value.startsWith("$2b$") || value.startsWith("$2y$");
    }
}
