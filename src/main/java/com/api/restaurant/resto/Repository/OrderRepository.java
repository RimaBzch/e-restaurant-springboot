package com.api.restaurant.resto.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.api.restaurant.resto.beans.Order;

public interface OrderRepository extends MongoRepository<Order, String>{

}
