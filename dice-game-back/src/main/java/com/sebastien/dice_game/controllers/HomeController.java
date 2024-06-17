package com.sebastien.dice_game.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping(path="/")
    public String home() {
        return "Welcome to Dice Game";
    }

}
