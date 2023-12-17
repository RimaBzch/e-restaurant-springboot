package com.api.restaurant.resto.beans;

public class IncomeByMonth {
	private Double income;
	private String Month;
	
	
	public IncomeByMonth() {
		super();
	}
	public IncomeByMonth(Double income, String month) {
		super();
		this.income = income;
		Month = month;
	}
	public Double getIncome() {
		return income;
	}
	public void setIncome(Double income) {
		this.income = income;
	}
	public String getMonth() {
		return Month;
	}
	public void setMonth(String month) {
		Month = month;
	} 
	
	
}
