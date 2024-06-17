package com.sebastien.dice_game.repository;

import com.sebastien.dice_game.models.Jwt;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.stream.Stream;

@Repository
public interface JwtRepository extends CrudRepository<Jwt, Integer> {
    Optional<Jwt> findByValeur(String valeur);

    Optional<Jwt> findByValeurAndDesactiveAndExpire(String valuer, boolean desactive, boolean expire);

    @Query("FROM Jwt j WHERE j.expire = :expire AND j.desactive = :desactive AND j.user.username = :username")
    Optional<Jwt> findUserValidToken(String username, boolean desactive, boolean expire);

    @Query("FROM Jwt j WHERE j.user.username = :username")
    Stream<Jwt> findValidTokenByUsername(String username);

    @Query("FROM Jwt j WHERE j.refreshToken.valeur = :username")
    Optional<Jwt> findRefreshToken(String username);

    @Query("DELETE FROM Jwt j WHERE j.expire = :expire AND j.desactive = :desactive")
    void deleteUselessTokens(boolean expire, boolean desactive);




}
