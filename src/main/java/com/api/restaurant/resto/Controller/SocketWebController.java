package com.api.restaurant.resto.Controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import com.api.restaurant.resto.beans.Order;
import com.api.restaurant.resto.beans.Reponse;
import com.api.restaurant.resto.service.OrderService;


@Controller
public class SocketWebController {
	private OrderService orderService;
	Logger logger = LoggerFactory.getLogger(OrderController.class);

	public SocketWebController(OrderService orderService) {
		this.orderService = orderService;
	}
	
	
	
	@MessageMapping("/synchronize/userCurrentOrder")
	@SendTo("/topic/usercurrentOrder")
	public Reponse<List<Order>> synchronizeCurrentOrderUserDash(String id)
	{
		Reponse<List<Order>> rep = new Reponse<List<Order>>();
		List<Order> lstOrder = new ArrayList<Order>();
		try {
			logger.trace("entring to synchronizeCurrentOrderUserDash "+id);
			lstOrder = orderService.findLastTenOrderByUserId(id);
			rep.setObject(lstOrder);
			rep.setStatus("OK");
		} catch (Exception e) {
			logger.error("synchronizeCurrentOrderUserDash exception : "+e.getStackTrace());
			rep.setStatus("KO");
			rep.setMessage(e.getMessage()); 
		}
		return rep;
	}

	
	@MessageMapping("/synchronize/recepdash")
	@SendTo("/topic/receptionDashboard")
	public Reponse<List<Order>> synchronizeReceptionDash()
	{
		Reponse<List<Order>> rep = new Reponse<List<Order>>();
		List<Order> lstOrder = new ArrayList<Order>();
		try {
			logger.trace("entring to findPayedAndNotAssigned ");
			lstOrder = orderService.findPayedNotPrepared();
			rep.setObject(lstOrder);
			rep.setStatus("OK");
		} catch (Exception e) {
			logger.error("findPayedAndNotAssigned exception : "+e.getStackTrace());
			rep.setStatus("KO");
			rep.setMessage(e.getMessage()); 
		}
		return rep;
	}
	
	@MessageMapping("/synchronize/deliverydash")
	@SendTo("/topic/deliveryDashboard")
	public Reponse<List<Order>> synchronizeDeliverDash()
	{
		Reponse<List<Order>> rep = new Reponse<List<Order>>();
		List<Order> lstOrder = new ArrayList<Order>();
		try {
			logger.trace("entring to findPayedAndNotAssigned ");
			lstOrder = orderService.findPayedNotAssigned();
			rep.setObject(lstOrder);
			rep.setStatus("OK");
		} catch (Exception e) {
			logger.error("findPayedAndNotAssigned exception : "+e.getStackTrace());
			rep.setStatus("KO");
			rep.setMessage(e.getMessage()); 
		}
		return rep;
	}
	
	
	@MessageMapping("/synchronize/getDeliveryAssignedToId")
	@SendTo("/topic/deliveryDashboardById")
	public Reponse<List<Order>> synchronizeGetAssinedToID(String id)
	{
		Reponse<List<Order>> rep = new Reponse<List<Order>>();
		List<Order> lstOrder = new ArrayList<Order>();
		try {
			logger.trace("entring to findPayedAndNotAssigned ");
			lstOrder = orderService.findAssignedById(id);
			rep.setObject(lstOrder);
			rep.setStatus("OK");
		} catch (Exception e) {
			logger.error("findPayedAndNotAssigned exception : "+e.getStackTrace());
			rep.setStatus("KO");
			rep.setMessage(e.getMessage()); 
		}
		return rep;
	}
	
	@MessageMapping("/synchronize")
	@SendTo("/topic/userDashboard")
	public Order greeting(/*String idOrder*/) throws Exception {

		Order or = new Order();
		or.setAmount(100000);
		or.setDateDeliviery(new Date());
		or.setDateReqOrder(new Date());
		or.setDelivered(false);
		or.setId("q1");
		or.setIdDelivery("q2");
		or.setIdUser("");
		or.setLat(111);
		or.setLon(222);
		or.setOrder("asssa");
		logger.info("Received message get order by id  :",or.getAmount());

		//Thread.sleep(1000); // simulated delay
		return or;
	}

}
