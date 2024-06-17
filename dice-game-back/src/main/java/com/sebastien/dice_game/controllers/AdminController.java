package com.sebastien.dice_game.controllers;


import com.sebastien.dice_game.models.User;
import com.sebastien.dice_game.models.score;
import com.sebastien.dice_game.services.ScoreService;
import com.sebastien.dice_game.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class AdminController {

    private final ScoreService scoreService;
    private final UserService userService;

    public AdminController(ScoreService scoreService, UserService userService) {
        this.scoreService = scoreService;
        this.userService = userService;
    }



    @GetMapping("/admin")
    public void AuthorizeAcess(){

    }

    @GetMapping("/admin/scores/all")
    public Iterable<score> getAllScores() {
        System.out.print("Getting all score");
        return scoreService.getScores();
    }

    @DeleteMapping("/admin/scores/{id}")
    public ResponseEntity<score> deleteScore(@PathVariable Long id){
        System.out.println("Deleting score with id: " + id);
        scoreService.deleteScore( id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/admin/users/all")
    public Iterable<User> getAllUsers(){
        System.out.print("Getting all Users");
        return userService.getAllUsers();
    }

    @DeleteMapping("/admin/users/{id}")
    public ResponseEntity<score> deleteUser(@PathVariable Integer id){
        System.out.println("Deleting user with id: " + id);
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
