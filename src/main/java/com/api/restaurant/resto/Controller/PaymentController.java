package com.api.restaurant.resto.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.restaurant.resto.beans.PaymentReq;
import com.api.restaurant.resto.util.StripeClient;
import com.stripe.model.Charge;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private StripeClient stripeClient;

    @Autowired
    PaymentController(StripeClient stripeClient) {
        this.stripeClient = stripeClient;
    }

    
    @PostMapping("/charge")
    public Charge chargeCard(@RequestBody PaymentReq p) throws Exception {
    	System.out.println("payment : "+p.getToken()/*request.getParameterValues("token")[0]*/);
        String token = p.getToken();//request.getParameterValues("token")[0];
        Double amount = p.getAmount();//Double.parseDouble(request.getParameterValues("amount")[0]);
        return this.stripeClient.chargeCreditCard(token, amount);
       
    }
}