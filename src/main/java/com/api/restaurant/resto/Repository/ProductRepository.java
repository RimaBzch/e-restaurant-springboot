package com.api.restaurant.resto.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.api.restaurant.resto.beans.Categorie;
import com.api.restaurant.resto.beans.Repas;

public interface ProductRepository extends MongoRepository<Repas, String>  {

	
	Optional<Repas> findByName(String name);
	Optional<Repas> findAllByCategorie(String categorie);
	
}
