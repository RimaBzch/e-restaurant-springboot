package com.api.restaurant.resto.Scheduler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.api.restaurant.resto.Controller.OrderController;
import com.api.restaurant.resto.service.OrderService;


@Component
public class Scheduler {
	private OrderService orderService;
	Logger logger = LoggerFactory.getLogger(OrderController.class);
    Scheduler(OrderService orderService) {
        this.orderService = orderService;
    }

//    @Scheduled(fixedRateString = "60000", initialDelayString = "0")
//    public void schedulingTask() {
//        logger.info("Send messages due to schedule");
//        orderService.findPayedNotAssigned();
//    }
}

