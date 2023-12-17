package com.api.restaurant.resto.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.api.restaurant.resto.beans.Categorie;

public interface CategorieRepository extends MongoRepository<Categorie, String> {
		Optional<Categorie> findByName(String name);
}
