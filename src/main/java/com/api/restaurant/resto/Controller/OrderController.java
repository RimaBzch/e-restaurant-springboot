package com.api.restaurant.resto.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.restaurant.resto.beans.Order;
import com.api.restaurant.resto.beans.OrderReq;
import com.api.restaurant.resto.beans.Reponse;
import com.api.restaurant.resto.service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderController {
	private OrderService orderService;
	Logger logger = LoggerFactory.getLogger(OrderController.class);
	public OrderController(OrderService orderService) {
		this.orderService = orderService;
	}
	@PostMapping("/savee")
	public String saveOrdeer(String orderReq) {
		System.out.println("Save order : "+orderReq);
		return "swsssswsddcecws";
	}

	@PostMapping("/save")
	public Reponse<String> saveOrder(@RequestBody OrderReq orderReq) {
		Order or = new Order();
		System.out.println("Save order : "+orderReq);
		Reponse<String> rep = new Reponse<String>();
		try {
			or.setAmount(orderReq.getAmount());
			or.setDateDeliviery(orderReq.getDateDeliviery());
			or.setDateReqOrder(orderReq.getDateReqOrder());
			or.setDelivered(orderReq.isDelivered());
			or.setIdDelivery(orderReq.getIdDelivery());
			or.setIdUser(orderReq.getIdUser());
			or.setOrder(orderReq.getOrder());
			or.setPayed(orderReq.isPayed());
			or.setPrepared(orderReq.isPrepared());
			or.setLon(orderReq.getLon());
			or.setLat(orderReq.getLat());
			Order orSaved = orderService.saveOrder(or);
			rep.setStatus("OK");
			rep.setObject(orSaved.getId());
		} catch (Exception e) {
			rep.setStatus("KO");
			rep.setMessage(e.getMessage());
		}
		return rep;
	}

	@PostMapping("/update")
	@SuppressWarnings("rawtypes")
	public Reponse updateOrder(@RequestBody OrderReq orderReq) {
		Order or = new Order();
		Reponse rep = new Reponse();
		try {
			or.setAmount(orderReq.getAmount());
			or.setDateDeliviery(orderReq.getDateDeliviery());
			or.setDateReqOrder(orderReq.getDateReqOrder());
			or.setDelivered(orderReq.isDelivered());
			or.setIdDelivery(orderReq.getIdDelivery());
			or.setIdUser(orderReq.getIdUser());
			or.setOrder(orderReq.getOrder());
			or.setPayed(orderReq.isPayed());
			or.setId(orderReq.getId());
			or.setPrepared(orderReq.isPrepared());
			or.setLon(orderReq.getLon());
			or.setLat(orderReq.getLat());
			orderService.updateOrderById(or);
			
			rep.setStatus("OK");
		} catch (Exception e) {
			rep.setStatus("KO");
			rep.setMessage(e.getMessage());
		}
		return rep;
	}
	
	@PostMapping("/find/notassigned")
	public Reponse<List<Order>> findNotAssigned(@RequestBody Pageable pageable) {
		Reponse<List<Order>> rep = new Reponse<List<Order>>();
		List<Order> lstOrder = new ArrayList<Order>();
		try {
			lstOrder = orderService.findNotAssigned(pageable);
			rep.setObject(lstOrder);
			rep.setStatus("OK");
		} catch (Exception e) {
			rep.setStatus("KO");
			rep.setMessage(e.getMessage());
		}
		return rep;
	}
	@PostMapping("/find/assigned")
	public Reponse<List<Order>> findAssigned(@RequestBody Pageable pageable) {
		Reponse<List<Order>> rep = new Reponse<List<Order>>();
		List<Order> lstOrder = new ArrayList<Order>();
		try {
			lstOrder = orderService.findAssigned(pageable);
			rep.setObject(lstOrder);
			rep.setStatus("OK");
		} catch (Exception e) {
			rep.setStatus("KO");
			rep.setMessage(e.getMessage());
		}
		return rep;
	}

	
	@GetMapping("/find/payed/notPrepared")
	public Reponse<List<Order>> findPayedAndNotPrepared() {
		Reponse<List<Order>> rep = new Reponse<List<Order>>();
		List<Order> lstOrder = new ArrayList<Order>();
		try {
			logger.trace("entring to findPayedAndNotAssigned ");
			lstOrder = orderService.findPayedNotPrepared();
			rep.setObject(lstOrder);
			rep.setStatus("OK");
		} catch (Exception e) {
			logger.error("findPayedAndNotPrepared exception : "+e.getStackTrace());
			rep.setStatus("KO");
			rep.setMessage(e.getMessage()); 
		}
		return rep;
	}
	
	
	@GetMapping("find/payed/assigned/delivered/user/{id}")
	public Reponse<List<Order>> findOrderDeliveredByUserId(@PathVariable("id") String id) {
		Reponse<List<Order>> rep = new Reponse<List<Order>>();
		List<Order> lstOrder = new ArrayList<Order>();
		try {
			logger.trace("entring to findOrderDeliveredByUserId ");
			lstOrder = orderService.findDeliveredByUserId(id);
			rep.setObject(lstOrder);
			rep.setStatus("OK");
		} catch (Exception e) {
			logger.error("find order by user id  exception : "+e.getStackTrace());
			rep.setStatus("KO");
			rep.setMessage(e.getMessage()); 
		}
		return rep;
	}

	@GetMapping("/find/payed/notAssigned")
	public Reponse<List<Order>> findPayedAndNotAssigned() {
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
	
	
	
	
	@GetMapping("/find/{id}")
	public Reponse<Order> findOrderById(@PathVariable("id") String id) {
		Reponse<Order> rep = new Reponse<Order>();
		Order order = new Order();
		try {
			logger.trace("entring to findOrderById ");
			order = orderService.findById(id);
			if(order!=null)
			{
			rep.setObject(order);
			rep.setStatus("OK");
			}
			else
			{
				rep.setStatus("KO");
				rep.setMessage("No order found with that id"); 
			}
		} catch (Exception e) {
			logger.error("findOrderById exception : "+e.getStackTrace());
			rep.setStatus("KO");
			rep.setMessage(e.getMessage()); 
		}
		return rep;
	}
	
	@GetMapping("/find/payed/assigned/{id}")
	public Reponse<List<Order>> findAssignedById(@PathVariable("id") String id) {
		Reponse<List<Order>> rep = new Reponse<>();
		List<Order> orders = new ArrayList<>();
		try {
			logger.trace("entring to findOrder By delivery Id ");
			orders = orderService.findAssignedById(id);
			rep.setStatus("OK");
			if(!orders.isEmpty())
			{
				rep.setObject(orders);
			}
			else
			{
				rep.setMessage("No orders assigned to you "); 
			}
		} catch (Exception e) {
			logger.error("findOrder assigned to delivery exception : "+e.getStackTrace());
			rep.setStatus("KO");
			rep.setMessage(e.getMessage()); 
		}
		return rep;
	}
	
	@GetMapping("/find/payed/assigned/delivered/{id}")
	public Reponse<List<Order>> findAssignedDeliveredById(@PathVariable("id") String id) {
		Reponse<List<Order>> rep = new Reponse<>();
		List<Order> orders = new ArrayList<>();
		try {
			logger.trace("entring to findOrder By delivery Id ");
			orders = orderService.findAssignedDeliveredById(id);
			rep.setStatus("OK");
			if(!orders.isEmpty())
			{
				rep.setObject(orders);
			}
			else
			{
				rep.setMessage("No orders assigned to you "); 
			}
		} catch (Exception e) {
			logger.error("findOrder assigned to delivery exception : "+e.getStackTrace());
			rep.setStatus("KO");
			rep.setMessage(e.getMessage()); 
		}
		return rep;
	}
	
	@GetMapping("/find/last/ten/user/{id}")
	public Reponse<List<Order>> findLastTenOrderByUserId(@PathVariable("id") String id) {
		Reponse<List<Order>> rep = new Reponse<>();
		List<Order> orders = new ArrayList<>();
		try {
			logger.trace("entring to findOrder By delivery Id ");
			orders = orderService.findLastTenOrderByUserId(id);
			rep.setStatus("OK");
			if(!orders.isEmpty())
			{
				rep.setObject(orders);
			}
			else
			{
				rep.setMessage("No orders assigned to you "); 
			}
		} catch (Exception e) {
			logger.error("findOrder assigned to u exception : "+e.getStackTrace());
			rep.setStatus("KO");
			rep.setMessage(e.getMessage()); 
		}
		return rep;
	}
	
	@GetMapping("/income/{year}")
	public Reponse<Map<Integer,Double>> calculateIncomeOfEachMonthByYear(@PathVariable("year") Integer year) {
		Reponse<Map<Integer,Double>> rep = new Reponse<>();
		Map<Integer,Double> IncomePerMonth = new HashMap<>();
		try {
			logger.trace("entring to calculateIncomeOfEachMonthByYear By year :"+year);
			IncomePerMonth = orderService.IncomeByYearForEachMonth(year);
			rep.setStatus("OK");
			if(!IncomePerMonth.isEmpty())
			{
				rep.setObject(IncomePerMonth);
			}
			else
			{
				rep.setMessage("No orders assigned to you "); 
			}
		} catch (Exception e) {
			logger.error("calculateIncomeOfEachMonthByYear exception : "+e.getStackTrace());
			rep.setStatus("KO");
			rep.setMessage(e.getMessage()); 
		}
		return rep;
	}
	

}
