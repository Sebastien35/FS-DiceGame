package com.sebastien.dice_game.services;


import com.sebastien.dice_game.models.Role;
import com.sebastien.dice_game.models.TypeDeRole;
import com.sebastien.dice_game.models.User;
import com.sebastien.dice_game.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService implements UserDetailsService {
    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public void registerUser(User user) {


        if(!user.getEmail().contains("@")){
            throw new RuntimeException("Email Invalide");
        }
        if(!user.getEmail().contains(".")){
            throw new RuntimeException("Email Invalide");
        }

        Optional<User> UserOptional = Optional.ofNullable(this.userRepository.findByEmail(user.getEmail()));
        if(UserOptional.isPresent()){
            throw new RuntimeException("Email Already Exists");
        }


        String CryptedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(CryptedPassword);

        Role roleUser = new Role();
        roleUser.setLibelle(TypeDeRole.USER);
        user.setRole(roleUser);


        this.userRepository.save(user);
    }


    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException(username);
        }
        return this.userRepository.findByEmail(user.getEmail());
    }

    public Iterable<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    public void deleteUser(Integer id){
        this.userRepository.deleteById(id);
    }




}
