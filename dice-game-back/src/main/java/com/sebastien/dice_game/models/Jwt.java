package com.sebastien.dice_game.models;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="jwt")
public class Jwt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int id;
    private String valeur;
    private boolean desactive;
    private String role;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE })
    private RefreshToken refreshToken;

    private boolean expire;
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE})
    @JoinColumn(name="user_id")
    private User user;
}
