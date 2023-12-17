package com.api.restaurant.resto.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.api.restaurant.resto.beans.User;

public interface UserRepository extends MongoRepository<User, String> {

	Optional<User> findUserByEmail(String email);
}
