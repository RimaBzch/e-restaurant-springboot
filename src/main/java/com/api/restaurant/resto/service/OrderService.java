package com.api.restaurant.resto.service;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.api.restaurant.resto.Repository.OrderRepository;
import com.api.restaurant.resto.beans.IncomeByMonth;
import com.api.restaurant.resto.beans.Order;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class OrderService {
	@Autowired
	private OrderRepository orderRep;

	public Order saveOrder(Order order) {
		return this.orderRep.save(order);
	}

	public List<Order> findNotAssigned(Pageable pageable) {
		List<Order> lstOrder = this.orderRep.findAll(pageable)
				.filter(or -> or.getIdDelivery().isEmpty() || or.getIdDelivery().isEmpty()).toList();
		return lstOrder;
	}

	public void updateOrder(Order order) throws Exception {
		String id = this.orderRep.findAll().stream()
				.filter(or -> or.getDateReqOrder().equals(order.getDateReqOrder())
						&& or.getIdUser().equals(order.getIdUser()) && or.getOrder().equals(order.getOrder()))
				.collect(Collectors.toList()).get(0).getId();
		order.setId(id);
		this.orderRep.save(order);
	}

	public void updateOrderById(Order order) throws Exception {
		String id = this.orderRep.findAll().stream().filter(or -> or.getId().equals(order.getId()))
				.collect(Collectors.toList()).get(0).getId();
		if (id != null)
			this.orderRep.save(order);
		else
			throw new Exception("Cannot find the id order to update ");
	}

	public List<Order> findAssigned(Pageable pageable) {
		List<Order> lstOrder = this.orderRep.findAll(pageable)
				.filter(or -> or.getIdDelivery() != null && !or.getIdDelivery().isEmpty()).toList();
		return lstOrder;
	}

	public List<Order> findAssignedById(String id) {
		List<Order> lstOrder = this.orderRep.findAll().stream()
				.filter(or -> or.getIdDelivery().equals(id) && or.isDelivered() == false).toList();
		return lstOrder;
	}

	public List<Order> findAssignedDeliveredById(String id) {
		List<Order> lstOrder = this.orderRep.findAll().stream()
				.filter(or -> or.getIdDelivery().equals(id) && or.isDelivered()).toList();
		return lstOrder;
	}

	public List<Order> findPayedNotPrepared() {
		List<Order> lstOrder = this.orderRep.findAll().stream()
				.filter(or -> or.getIdDelivery().isEmpty() && or.isPrepared() == false && or.isPayed() == true)
				.toList();
		return lstOrder;
	}

	public List<Order> findPayedNotAssigned() {
		List<Order> lstOrder = this.orderRep.findAll().stream()
				.filter(or -> or.getIdDelivery().isEmpty() && or.isPrepared() == true && or.isPayed() == true).toList();
		return lstOrder;
	}

	public List<Order> findDeliveredByUserId(String id) {
		List<Order> lstOrder = this.orderRep.findAll().stream()
				.filter(or -> or.getIdUser().equals(id) && or.isDelivered() == true).toList();
		return lstOrder;
	}

	public List<Order> findLastTenOrderByUserId(String id) {

		List<Order> lstOrder = this.orderRep.findAll().stream()
				.filter(or -> String.valueOf(or.getIdUser()).equals(String.valueOf(id))
						&& sameDateOfToDay(or.getDateReqOrder()))
				.toList();
		return lstOrder;
	}

	private boolean sameDateOfToDay(Date date1) {
		Calendar cal1 = Calendar.getInstance();
		Calendar cal2 = Calendar.getInstance();
		Calendar cal3 = Calendar.getInstance();
		cal1.setTime(date1);
		cal2.setTime(new Date());
		cal2.add(Calendar.DATE, -1);
		cal3.setTime(new Date());
		return (cal1.get(Calendar.DAY_OF_YEAR) == cal2.get(Calendar.DAY_OF_YEAR)
				&& cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR))
				|| (cal1.get(Calendar.DAY_OF_YEAR) == cal3.get(Calendar.DAY_OF_YEAR)
						&& cal1.get(Calendar.YEAR) == cal3.get(Calendar.YEAR));
	}

	public Order findById(String id) {
		List<Order> lstOrder = this.orderRep.findAll().stream().filter(o -> o.getId().equals(id)).toList();
		if (lstOrder.size() > 0) {
			return lstOrder.get(0);
		}

		return null;
	}

	public Map<Integer, Double> IncomeByYearForEachMonth(Integer year) {
		List<Order> lstorder = this.orderRep.findAll().stream().filter(o -> checkDateDeliveryForIncome(o, year))
				.toList();
		Map<Integer, Double> monthlyIncomeList = new HashMap<>();
		for (int i = 1; i <= 12; i++) {
			double monthlyIncome = 0.0;
			for (Order order :lstorder) {
				if (checkMonthDeliveryForIncome(order, i)) {
					monthlyIncome += order.getAmount();
				}
			}
			monthlyIncomeList.put(i, monthlyIncome);
		}
		return monthlyIncomeList;
	}

	private boolean checkDateDeliveryForIncome(Order o, Integer year) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(o.getDateDeliviery());
		return calendar.get(Calendar.YEAR) == year && o.isDelivered() == true;

	}
	
	private boolean checkMonthDeliveryForIncome(Order o, Integer month) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(o.getDateDeliviery());
		return calendar.get(Calendar.MONTH) == month ;

	}

}
