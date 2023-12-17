package com.api.restaurant.resto.util;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.stripe.Stripe;
import com.stripe.model.Charge;


@Component
public class StripeClient {

    @Autowired
    StripeClient() {
        Stripe.apiKey = "sk_test_51KnuEHFt0P3uGCJz15QYp0AWH2XFofvi8XIxxzZ9kxeNp6sIQ6AyU3HS4zRsCBt8VNtpkNuGexJlXMbHJZdn4boJ008qzOmPFp";
    }

    public Charge chargeCreditCard(String token, double amount) throws Exception {
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        chargeParams.put("amount", (int)(amount * 100));
        chargeParams.put("currency", "EUR");
        chargeParams.put("source", token);
        Charge charge = null;
        try {
        charge =Charge.create(chargeParams);
        }
        catch(Exception e)
        {
        	System.out.println("charge :"+e);
        }
        return charge;
    }
}