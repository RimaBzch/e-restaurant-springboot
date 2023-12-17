package com.api.restaurant.resto.beans;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document
public class Repas {
	@Id
	private String id;
	@Indexed(unique=true)
	private String name;
	private ImageModel picture;
	private String categorie;
	private String composition;
	private double price;

	public Repas(ImageModel picture,String name, String categorie, String composition, double price) {
		super();
		this.picture = picture;
		this.categorie = categorie;
		this.composition = composition;
		this.price = price;
		this.name =name;
	}

	public String getComposition() {
		return composition;
	}

	public void setComposition(String composition) {
		this.composition = composition;
	}

	public void setCategorie(String categorie) {
		this.categorie = categorie;
	}
	
	public String getCategorie()
	{
		return this.categorie;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public ImageModel getPicture() {
		return picture;
	}

	public void setPicture(ImageModel picture) {
		this.picture = picture;
	}

	public double getPrix() {
		return price;
	}

	public void setPrix(double prix) {
		this.price = prix;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
