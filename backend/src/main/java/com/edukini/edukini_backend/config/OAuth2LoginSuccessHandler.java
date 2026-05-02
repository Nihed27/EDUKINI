package com.edukini.edukini_backend.config;

import com.edukini.edukini_backend.model.User;
import com.edukini.edukini_backend.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;

    public OAuth2LoginSuccessHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email = getString(attributes.get("email"));
        if (email != null && !email.isBlank()) {
            upsertOAuthUser(email.trim().toLowerCase(), attributes);
        }

        response.sendRedirect("http://localhost:4200/statut?oauth=success");
    }

    private void upsertOAuthUser(String email, Map<String, Object> attributes) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        User user = existingUser.orElseGet(User::new);

        user.setEmail(email);
        user.setPrenom(resolvePrenom(attributes, user.getPrenom()));
        user.setNom(resolveNom(attributes, user.getNom()));

        // Keep local/password login intact for existing users.
        if (!existingUser.isPresent() && (user.getPassword() == null || user.getPassword().isBlank())) {
            user.setPassword("GOOGLE_OAUTH");
        }

        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("ROLE_STUDENT");
        }

        userRepository.save(user);
    }

    private String resolvePrenom(Map<String, Object> attributes, String fallback) {
        String givenName = getString(attributes.get("given_name"));
        if (givenName != null && !givenName.isBlank()) {
            return givenName;
        }
        String fullName = getString(attributes.get("name"));
        if (fullName != null && !fullName.isBlank()) {
            String[] parts = fullName.trim().split("\\s+");
            if (parts.length > 0) return parts[0];
        }
        return (fallback == null || fallback.isBlank()) ? "Google" : fallback;
    }

    private String resolveNom(Map<String, Object> attributes, String fallback) {
        String familyName = getString(attributes.get("family_name"));
        if (familyName != null && !familyName.isBlank()) {
            return familyName;
        }
        String fullName = getString(attributes.get("name"));
        if (fullName != null && !fullName.isBlank()) {
            String[] parts = fullName.trim().split("\\s+");
            if (parts.length > 1) return parts[parts.length - 1];
        }
        return (fallback == null || fallback.isBlank()) ? "User" : fallback;
    }

    private String getString(Object value) {
        return value instanceof String ? (String) value : null;
    }
}
