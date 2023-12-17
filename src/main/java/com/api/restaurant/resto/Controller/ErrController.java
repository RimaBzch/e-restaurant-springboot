package com.api.restaurant.resto.Controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/error")
@AllArgsConstructor
public class ErrController implements ErrorController{

	@GetMapping
	public String handleError() {
		return "Path doesn't exist, please contact the administrator !";
	}

}
