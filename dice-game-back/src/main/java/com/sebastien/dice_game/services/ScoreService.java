package com.sebastien.dice_game.services;


import com.sebastien.dice_game.models.score;
import com.sebastien.dice_game.repository.ScoreRepository;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Stream;

@Transactional
@Data
@Service
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepository;
    public Optional<score> getScore(final Long Id){
        return scoreRepository.findById(Id);
    }

    public Iterable<score> getScores() {
        return scoreRepository.findAll();
    }

    public void deleteScore(final Long Id) {
        scoreRepository.deleteById(Id);
    }

    public score saveScore(final score score) {
        return scoreRepository.save(score);
    }


    public Iterable<score> getScoresFromGamesWithXTurns(int turns){
        return scoreRepository.findAllByTurns(turns);
    }


}
