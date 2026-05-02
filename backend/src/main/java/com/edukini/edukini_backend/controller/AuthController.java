package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.dto.RegisterRequest;
import com.edukini.edukini_backend.dto.ResetPasswordRequest;
import com.edukini.edukini_backend.dto.ForgotPasswordRequest;
import com.edukini.edukini_backend.dto.LoginRequest;
import com.edukini.edukini_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        String result = authService.register(request);
        if (result.equals("Compte créé avec succès")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

   @PostMapping("/login")
public ResponseEntity<String> login(@RequestBody LoginRequest request) {
    String result = authService.login(request);
    if (result.equals("STUDENT") || result.equals("ADMIN")) {
        return ResponseEntity.ok(result);
    }
    return ResponseEntity.badRequest().body(result);
}

    // ← AJOUTE CETTE METHODE pour capturer les erreurs de validation
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errors = ex.getBindingResult().getAllErrors().stream()
                .map(error -> ((FieldError) error).getDefaultMessage())
                .collect(Collectors.joining(", "));
        return ResponseEntity.badRequest().body(errors);
    }
    @PostMapping("/forgot-password")
public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
    String result = authService.forgotPassword(request.getEmail());
    if (result.equals("Un email de réinitialisation a été envoyé")) {
        return ResponseEntity.ok(result);
    }
    return ResponseEntity.badRequest().body(result);
}

@PostMapping("/reset-password")
public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
    String result = authService.resetPassword(request.getToken(), request.getNewPassword());
    if (result.equals("Mot de passe réinitialisé avec succès")) {
        return ResponseEntity.ok(result);
    }
    return ResponseEntity.badRequest().body(result);
}
}