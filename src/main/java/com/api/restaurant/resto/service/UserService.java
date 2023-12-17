package com.api.restaurant.resto.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.api.restaurant.resto.Repository.UserRepository;
import com.api.restaurant.resto.beans.User;

import lombok.AllArgsConstructor;

//@AllArgsConstructor
@Service
public class UserService {

	private UserRepository userRep;

	public UserService(UserRepository userRep) {
		this.userRep = userRep;
	}

	public List<User> getAllUsers() {
		return userRep.findAll();
	}

	public boolean registerNewUser(User user) throws Exception {
		if (!findUserByEmail(user)) {
			userRep.save(user);
			return true;
		} else
			return false;
	}

	private boolean findUserByEmail(User user) throws Exception {
		return userRep.findUserByEmail(user.getEmail()).isPresent();
	}

	public void deleteUser(String userId) {
		userRep.deleteById(userId);
	}

	public void updateUser(User user) {
		userRep.save(user);
	}

	public User login(User user) {
		return userRep.findAll().stream().filter(userSearch -> userSearch.getEmail().equals(user.getEmail())
				&& userSearch.getPassword().equals(user.getPassword())).toList().get(0);

	}

	public User login(String email, String password) {
		return userRep.findAll().stream()
				.filter(userSearch -> userSearch.getEmail().equals(email) && userSearch.getPassword().equals(password))
				.toList().get(0);

	}

	public boolean updateAdress(String address,Integer tel, String id) {
		List<User> users = this.userRep.findAll().stream().filter(us -> us.getId().equals(id)).toList();
		if (users.size() > 0) {
			User user = users.get(0);
			user.setAddress(address);
			user.setTel(tel);
			this.userRep.save(user);
			return true;
		} else
			return false;
	}

	public User getUserWithNoPassword(String id) {
		List<User> lsUser = this.userRep.findAll().stream().filter(u -> u.getId().equals(id))
				.collect(Collectors.toList());
		User user = null;
		if (lsUser.size() > 0) {
			user = lsUser.get(0);
			user.setPassword("");

			return user;
		}

		return null;
	}

}
