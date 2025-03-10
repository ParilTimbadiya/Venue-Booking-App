package com.cricboard.config.jwt;


import com.cricboard.repository.UserRepo;
import com.cricboard.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
@Service("userDetailsService")
public class UserDetailServiceImplementation implements UserDetailsService {
    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(username);
        if (user != null)
            return new UserDetailsImplementation(user);
        else
            throw new UsernameNotFoundException(username);
    }
}
