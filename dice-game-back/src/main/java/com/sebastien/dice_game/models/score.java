package com.sebastien.dice_game.models;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "scores", uniqueConstraints = @UniqueConstraint(columnNames = "game_id"))
@Getter @Setter
public class score  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="date")
    private LocalDateTime date;

    private int score;

    private String player;

    private int turns;

    @Column(name="game_Id", unique = true, nullable = false)
    private String gameId;



    public score(

    ){

    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getPlayer() {
        return player;
    }

    public void setPlayer(String player) {
        this.player = player;
    }

    public void setTurns(int turns) {
        this.turns = turns;

    }


    public int getTurns(){
        return this.turns;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

}
