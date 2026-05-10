package com.aryan.ai_assessment.auth.service;
import com.aryan.ai_assessment.auth.dto.LoginRequest;
import com.aryan.ai_assessment.auth.dto.RegisterRequest;
import com.aryan.ai_assessment.user.entity.Role;
import com.aryan.ai_assessment.user.entity.User;
import com.aryan.ai_assessment.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.time.LocalDateTime;
import com.aryan.ai_assessment.auth.jwt.JwtService;

@Service
public class AuthService {

    @Autowired
    private UserRepository useRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    public String register(RegisterRequest request){
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.CANDIDATE);
        user.setCreatedAt(LocalDateTime.now());

        useRepository.save(user);

        return "User Registered Successfully";

    }
    public String login(LoginRequest request){
        User user = useRepository.findByEmail(request.getEmail()).orElse(null);

        if(user == null) return "Please Check Your Email and Try Again.";

        boolean passwordMatch = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if(!passwordMatch){
            return "password not matched";
        }
        
        return jwtService.generateToken(user.getEmail());
    }

}
