package com.sebastien.dice_game.controllers;

import com.sebastien.dice_game.Dto.AuthentificationDto;
import com.sebastien.dice_game.models.User;
import com.sebastien.dice_game.security.JwtService;
import com.sebastien.dice_game.services.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE)

public class AuthController {
    private UserService userService;
    private AuthenticationManager authenticationManager;
    private JwtService jwtService;





    @PostMapping(path="register")
    public void register(@RequestBody User user) {
        userService.registerUser(user);
        log.info("User registered: " + user.toString());
    }

    @PostMapping(path="connect")
    public Map<String, String> connection(@RequestBody  AuthentificationDto authentificationDto){
        final Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authentificationDto.username(), authentificationDto.password() )
        );
        log.info("Authentication token: " + authentificationDto.toString());
        if(authenticate.isAuthenticated()){
            return this.jwtService.generate(authentificationDto.username());
        }
        return null ;
    }


    @PostMapping(path = "disconnect")
    public String logout(){
        this.jwtService.logout();
        return "Logged out successfully";
    }

    @PostMapping(path="refreshToken")
    public @ResponseBody Map<String, String> refreshToken(@RequestBody Map<String, String> refreshTokenRequest){
        return this.jwtService.refreshToken(refreshTokenRequest);
    }



}
