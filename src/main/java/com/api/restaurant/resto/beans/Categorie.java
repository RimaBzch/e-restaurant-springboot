package com.api.restaurant.resto.beans;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

public class Categorie {
	@Id
	private String id;
	@Indexed(unique=true) 
	private String name;
		
	
	public Categorie(String name) {
		super();
		this.name = name;
	}
	
	public Categorie() {
		super();
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
}
