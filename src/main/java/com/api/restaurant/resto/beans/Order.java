package com.api.restaurant.resto.beans;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document
public class Order {
	@Id
	private String id;
	@Indexed(unique = true)
	private String idUser;
	private String order;
	private double amount;
	private boolean payed;
	private boolean delivered;
	private boolean prepared;
	@Indexed(unique = true)
	private String idDelivery;
	private Date dateDeliviery;
	private Date dateReqOrder;
	private double lat;
	private double lon;

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLon() {
		return lon;
	}

	public void setLon(double lon) {
		this.lon = lon;
	}

	public boolean isPrepared() {
		return prepared;
	}

	public void setPrepared(boolean prepared) {
		this.prepared = prepared;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getIdUser() {
		return idUser;
	}

	public void setIdUser(String idUser) {
		this.idUser = idUser;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public boolean isPayed() {
		return payed;
	}

	public void setPayed(boolean payed) {
		this.payed = payed;
	}

	public boolean isDelivered() {
		return delivered;
	}

	public void setDelivered(boolean delivered) {
		this.delivered = delivered;
	}

	public String getIdDelivery() {
		return idDelivery;
	}

	public void setIdDelivery(String idDelivery) {
		this.idDelivery = idDelivery;
	}

	public Date getDateDeliviery() {
		return dateDeliviery;
	}

	public void setDateDeliviery(Date dateDeliviery) {
		this.dateDeliviery = dateDeliviery;
	}

	public Date getDateReqOrder() {
		return dateReqOrder;
	}

	public void setDateReqOrder(Date dateReqOrder) {
		this.dateReqOrder = dateReqOrder;
	}

}
