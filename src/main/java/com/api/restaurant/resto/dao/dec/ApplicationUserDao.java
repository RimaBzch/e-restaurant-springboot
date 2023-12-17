package com.api.restaurant.resto.dao.dec;

import java.util.Optional;

import com.api.restaurant.resto.auth.ApplicationUser;

public interface ApplicationUserDao {

	 Optional<ApplicationUser> selectApplicationUserByUsername(String username);
}
