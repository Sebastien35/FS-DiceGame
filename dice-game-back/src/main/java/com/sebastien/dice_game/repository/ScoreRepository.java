package com.sebastien.dice_game.repository;


import com.sebastien.dice_game.models.score;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.sebastien.dice_game.models.score;

import java.util.List;
import java.util.stream.Stream;

@Repository
public interface ScoreRepository extends CrudRepository<score, Long>{

    @Query("FROM score s WHERE s.turns = :turns ")
    Iterable<score> findAllByTurns(int turns);
}
