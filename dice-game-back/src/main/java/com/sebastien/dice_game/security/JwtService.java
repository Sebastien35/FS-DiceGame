package com.sebastien.dice_game.security;


import com.sebastien.dice_game.models.Jwt;
import com.sebastien.dice_game.models.RefreshToken;
import com.sebastien.dice_game.models.User;
import com.sebastien.dice_game.repository.JwtRepository;
import com.sebastien.dice_game.services.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.Query;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Key;
import java.time.Instant;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Transactional
@AllArgsConstructor
@Service
public class JwtService {
    public static final String REFRESH = "refresh";
    private UserService userService;
    private final String ENCRYPTION_KEY="a94ad8e387ea77f6bb75802944fb0c962921b664cd75c4948e34202f708b469c";
    private JwtRepository jwtRepository;
    public static final String BEARER = "bearer";

    public Map<String, String> generate(String username) {
        User user = this.userService.loadUserByUsername(username);
        this.disableTokens(user);

        final Map<String, String> jwtMap = new java.util.HashMap<>(this.generateJwtToken(user));
        RefreshToken refreshToken = RefreshToken.builder()
                .valeur(UUID.randomUUID().toString())
                .expire(false)
                .creation(Instant.now())
                .expiration(Instant.now().plusMillis(30*60*1000))
                .build();
        final Jwt jwt =Jwt
                .builder()
                .valeur(jwtMap.get(BEARER))
                .desactive(false)
                .expire(false)
                .user(user)
                .role(user.getRole().getLibelle().toString())
                .refreshToken(refreshToken)
                .build();
        this.jwtRepository.save(jwt);
        jwtMap.put("refresh", refreshToken.getValeur() );
        return jwtMap;
    }

    private void disableTokens(User user) {
        final List<Jwt> jwtList = this.jwtRepository.findValidTokenByUsername(user.getUsername()).peek(
                jwt -> {
                    jwt.setDesactive(true);
                    jwt.setExpire(true);
                }
        ).collect(Collectors.toList());

        this.jwtRepository.saveAll(jwtList);
    }

    public String extractUsername(String token) {
        return this.getClaim(token, Claims::getSubject);
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate = getExpirationDateFromToken(token);
        return expirationDate.before(new Date());
    }


    private Date getExpirationDateFromToken(String token) {
        return this.getClaim(token, Claims::getExpiration);
    }

    private <T> T getClaim(String token, Function<Claims, T> function) {
        Claims claims = getAllClaims(token);
        return function.apply(claims);
    }

    private Claims getAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(this.getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Map<String, String> generateJwtToken(User user) {

        final long currentTime = System.currentTimeMillis();
        final long Expiration= currentTime + 30 * 60 * 1000;
        final String role = user.getRole().getLibelle().toString();

        final Map<String, Object> claims = Map.of(
                "username",user.getUsername(),
                Claims.EXPIRATION, new Date(Expiration),
                Claims.SUBJECT, user.getUsername(),
                "role", role



            );

        final String bearer = Jwts.builder()
                .setIssuedAt(new Date(currentTime))
                .setExpiration(new Date(Expiration))
                .setSubject(user.getEmail())
                .setClaims(claims)
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
        return Map.of(BEARER, bearer);
    }

    private Key getKey() {
        final byte[] decoder = Decoders.BASE64.decode(ENCRYPTION_KEY);
        return Keys.hmacShaKeyFor(decoder);
    }


    public Jwt tokenByValue(String valeur) {
        return this.jwtRepository.findByValeur(valeur)
                .orElseThrow(() -> new RuntimeException("Token inconnu"));
    }

    public void logout() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Jwt jwt = this.jwtRepository.findUserValidToken(
                user.getUsername(),
                false,
                false)
                .orElseThrow(
                        () -> new RuntimeException("Token invalide")
                );
        jwt.setDesactive(true);
        jwt.setExpire(true);
        this.jwtRepository.save(jwt);
    }

    @Scheduled(cron ="* */1 * * *")
    public void  removeuselessTokens()
    {
        log.info("Suppression des tokens à ", Instant.now());
        this.jwtRepository.deleteUselessTokens(true, true);
    }


    public Map<String, String> refreshToken(Map<String, String> refreshTokenRequest) {
        final Jwt jwt = this.jwtRepository.findRefreshToken(refreshTokenRequest.get(REFRESH)).orElseThrow(() -> new RuntimeException("Token invalide")) ;
        if(jwt.getRefreshToken().isExpire() || jwt.getRefreshToken().getExpiration().isBefore(Instant.now())){
            throw new RuntimeException("Token expiré");
        }
        this.disableTokens(jwt.getUser());
        return this.generate(jwt.getUser().getUsername());

    }
}
