package com.sebastien.dice_game.controllers;

import com.sebastien.dice_game.models.score;
import com.sebastien.dice_game.services.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ScoreController {
    @Autowired
    private ScoreService scoreService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/Scores/save")
    public HttpStatus saveScore(@RequestBody score score){
        try {
            System.out.println(score);
            scoreService.saveScore(score);
            return HttpStatus.CREATED;
        } catch (Exception e) {
            e.printStackTrace();
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

    }

    @GetMapping("/Scores/all")
    public Iterable<score> getAllScores() {
        System.out.print("Getting all score");
        return scoreService.getScores();
    }

    @GetMapping("/Scores/{x}")
    public Iterable<score> getScore(@PathVariable int x){
        System.out.print("Getting score for x: " + x);
        return scoreService.getScoresFromGamesWithXTurns(x);
    }




}
