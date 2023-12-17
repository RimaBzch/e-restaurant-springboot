package com.api.restaurant.resto.beans;

import org.springframework.web.multipart.MultipartFile;

public class RequestBodyAddProduct {

	private String name;
	private String composition;
	private double price;

	private MultipartFile image;

	public RequestBodyAddProduct(String name, String composition, double price, MultipartFile image) {
		super();
		this.name = name;
		this.composition = composition;
		this.price = price;
		this.image = image;
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

	public MultipartFile getImage() {
		return image;
	}

	public void setImage(MultipartFile image) {
		this.image = image;
	}

}
