package com.api.restaurant.resto.beans;

public class PaymentReq {
    
	private double amount;
	private String token;
	
	
	
	public PaymentReq(double amount, String token) {
		super();
		this.amount = amount;
		this.token = token;
	}
	
	
	public PaymentReq() {
		super();
	}


	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	
	
}
