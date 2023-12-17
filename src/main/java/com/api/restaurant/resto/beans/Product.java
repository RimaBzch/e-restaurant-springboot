package com.api.restaurant.resto.beans;

public class Product {

	private String name;
	private String composition;
	private double price;
	private String categorie;

	public Product(String name, String composition, double price, String categorie) {
		super();
		this.name = name;
		this.composition = composition;
		this.price = price;
		this.categorie = categorie;
	}

	public Product() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getComposition() {
		return composition;
	}

	public void setComposition(String composition) {
		this.composition = composition;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getCategorie() {
		return categorie;
	}

	public void setCategorie(String categorie) {
		this.categorie = categorie;
	}

}
