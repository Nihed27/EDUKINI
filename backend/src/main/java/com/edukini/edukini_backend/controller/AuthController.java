// C:/Users/MSI/EDUKINI/backend/src/main/java/com/edukini/edukini_backend/controller/AuthController.java
package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.dto.LoginRequest;
import com.edukini.edukini_backend.dto.RegisterRequest;
import com.edukini.edukini_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
