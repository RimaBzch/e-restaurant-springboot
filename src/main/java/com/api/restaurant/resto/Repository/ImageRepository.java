package com.api.restaurant.resto.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.api.restaurant.resto.beans.ImageModel;

public interface ImageRepository extends MongoRepository<ImageModel, String> {
 
	Optional<ImageModel> findByName(String name);
}
