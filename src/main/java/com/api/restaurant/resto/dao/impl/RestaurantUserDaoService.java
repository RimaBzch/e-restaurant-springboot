package com.api.restaurant.resto.dao.impl;

import static com.api.restaurant.resto.security.ApplicationUserRole.ADMIN;
import static com.api.restaurant.resto.security.ApplicationUserRole.USER;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.api.restaurant.resto.auth.ApplicationUser;
import com.api.restaurant.resto.beans.User;
import com.api.restaurant.resto.dao.dec.ApplicationUserDao;
import com.api.restaurant.resto.service.UserService;
import com.google.common.collect.Lists;

@Repository("userDao")
public class RestaurantUserDaoService implements ApplicationUserDao{

	private final PasswordEncoder passwordEncoder;
	private final UserService userService;
	@Autowired
	public RestaurantUserDaoService(PasswordEncoder passwordEncoder,UserService userService)
	{
		this.passwordEncoder=passwordEncoder;
		this.userService = userService;
	}
	
	
	@Override
	public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {
		return getApplicationUsers()
				.stream()
				.filter(applicationUser -> username.equals(applicationUser.getUsername()))
				.findFirst();
	}

	private List<ApplicationUser> getApplicationUsers()
	{
		List<User> users = userService.getAllUsers();
		Iterator<User> ituser = users.iterator();
		List<ApplicationUser> applicationUser = new ArrayList<>();
		while(ituser.hasNext())
		{
			User user = ituser.next();
			applicationUser.add(new ApplicationUser(
							    USER.getGrantedAuthorites(),						
								passwordEncoder.encode(user.getPassword()),
								user.getName(),
								true,
								true,
								true,
								true
								));
		}
		return applicationUser;
	}
}
