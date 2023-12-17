package com.api.restaurant.resto.Controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.api.restaurant.resto.beans.Reponse;
import com.api.restaurant.resto.beans.User;
import com.api.restaurant.resto.service.UserService;

@RestController
@RequestMapping("/api/v1")
//@AllArgsConstructor
public class UserController {

	private UserService userService;
	Logger logger = LoggerFactory.getLogger(UserController.class);

	public UserController(UserService userService) {
		this.userService = userService;
	}
	// hasRole('ROLE_') hasAnyRole('ROLE_') hasAuthority('permission')
	// hasAnyAuthority('permission')

	@GetMapping("/users")
	// @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	public List<User> fetchAllUsers() {
		logger.trace("methode fetchAllUsers is been accessed");
		return userService.getAllUsers();
	}

	@PostMapping("/signup")
	// @PreAuthorize("hasAuthority('user:write')")
	public String registerUser(@RequestBody User user) {
		User userIns = new User();
		userIns.setName(user.getName());
		userIns.setEmail(user.getEmail());
		userIns.setPassword(user.getPassword());
		userIns.setRole(user.getRole());
		
		System.out.println("User : " + userIns.getEmail());
		logger.trace("methode registerUser is been accessed"+userIns.getEmail());
		boolean registred = false;
		try {
			registred = userService.registerNewUser(userIns);

		} catch (Exception e) {

			logger.error("exception signup : " + e.getStackTrace());
			System.out.print("exception signup : " + e);
		}
		if (registred) {
			logger.info("User registred successfully");
			return "{ \"success\" : \"User registred successfully\",\"error\" : \"\" }";
		} else {
			logger.info("User already exist or something went wrong");
			return "{ \"success\" : \"\" ,  \"error\" : \"User already exist or something went wrong\" }";
		}
	}

	@DeleteMapping(path = "/deleteUser/{userId}")
	@PreAuthorize("hasAuthority('user:write')")
	public void deleteUser(@PathVariable("userId") String userId) {
		logger.trace("methode deleteUser is been accessed");
		logger.info("User deleted successfully userid :" + userId);
		userService.deleteUser(userId);
	}

	@PostMapping("/updateUser")
	@PreAuthorize("hasAuthority('user:write')")
	public void updateUser(@RequestBody User user) {
		logger.trace("methode updateUser is been accessed");
		logger.info("User updated successfully " + user.getEmail());
		userService.updateUser(user);
	}

	@PostMapping("/auth")
	public String login(@RequestBody User user) {
		System.out.println("user :" + user);
		System.out.println("user : email" + user.getEmail() + "password :" + user.getPassword());
		// userService.updateUser(user);
		User UserExist = new User();
		try {
			UserExist = userService.login(user);
		} catch (Exception e) {
			logger.error("exception loggin  :" + e.getStackTrace());
			System.out.println("exception loggin  :" + e);
		}
		if (UserExist.getId() == null || UserExist.getId() == "") {
			logger.info("auth  Password or/and Email is incorrect" + user.getEmail());
			return "{ \"success\" : \"\",\"error\" : \"Password or/and Email is incorrect\"  }";
		} else {
			logger.info("auth  successfully" + user.getEmail());
			return "{ \"success\" : \"Login successfully\" ,  \"error\" : \"\" , \"role\" : \"" + UserExist.getRole()
					+ "\", \"id\" : \"" + UserExist.getId() + "\" }";
		}

	}

	@PostMapping("/test")
	public String test(@RequestBody String user) {
		System.out.println("user :" + user);
		// System.out.println("user : email"+user.getEmail()+"password
		// :"+user.getPassword());
		// userService.updateUser(user);
		return user;
	}

	@GetMapping("/logout")
	public String logoutPage(HttpServletRequest request, HttpServletResponse response) {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		logger.info("logged sucessfully");
		return " {\"success\":\"logged sucessfully\"}";
	}

	@PostMapping("/checkLogged")
	public String checkLogged(@RequestBody String userpass) {

		try {
			System.out.println("userpass :" + userpass);
			System.out.println("lenght" + userpass.length());
			System.out.println("char 0" + userpass.toString().charAt(0));
			System.out.println(
					"userpass.substring(0, userpass.indexOf(\";\")-1" + userpass.substring(0, userpass.indexOf(";")));

			System.out.println("dscsccv" + userpass.substring(userpass.indexOf(";") + 1));
			try {
				String username = userService.getAllUsers().stream().filter(
						userSearch -> userSearch.getEmail().equals(userpass.substring(0, userpass.indexOf(";"))))
						.toList().get(0).getName();

				boolean logged = false;
				logged = isLogged(username, userpass.substring(userpass.indexOf(";") + 1, userpass.length()));

				System.out.println("logged : " + logged);
				User userLogged = new User();
				if (logged) {
					userLogged = userService.login(userpass.substring(0, userpass.indexOf(";")),
							userpass.substring(userpass.indexOf(";") + 1, userpass.length()));
				}

				return "{ \"success\" : \"successfully\" ,  \"error\" : \"\" , \"role\" : \"" + userLogged.getRole()
						+ "\" }";
			} catch (Exception e) {
				System.out.print("username get all username : " + e);
			}
		} catch (Exception e) {
			System.out.print("Exception : " + e);
		}

		return "{ \"success\" : \"\" ,  \"error\" : \"Something wrong\" , \"role\" : \"\" }";

	}

	@RequestMapping(method = RequestMethod.POST, path = "/ss")
	public String ss(@RequestBody User user) {
		System.out.println("user :" + user);
		// System.out.println("user : email"+user.getEmail()+"password
		// :"+user.getPassword());
		// userService.updateUser(user);
		return user.getEmail();
	}

	public boolean isLogged(String user, String password) {
		try {
			System.out.println("user :" + user);
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			System.out.println(" get credential : " + authentication.getName());
			return null != authentication && (user).equals(authentication.getName());
		} catch (Exception e) {
			System.out.println("isLogged : " + e);
		}
		return false;
	}

	@RequestMapping(method = RequestMethod.POST, path = "/updateAdress")
	public Reponse<String> updateAddress(@RequestBody User user) {
		this.logger.trace("access to update adress methode");
		Reponse<String> rep = new Reponse<String>();
		try {
			boolean done = false;
			done = this.userService.updateAdress(user.getAddress(),user.getTel(),user.getId());
			if (done == true)
				rep.setStatus("OK");
			else {
				rep.setStatus("KO");
				rep.setMessage("User not found to update ");
			}
		} catch (Exception e) {
			rep.setStatus("KO");
			rep.setMessage(e.getMessage());
			this.logger.error(e.getStackTrace().toString());
		}

		return rep;
	}

	@RequestMapping(method = RequestMethod.POST, path = "/user")
	public Reponse<User> getUserWithNoPassword(@RequestBody String id) {
		this.logger.trace("access to getUserWithNoPassword  methode");
		Reponse<User> rep = new Reponse<User>();
		try {

			User user = this.userService.getUserWithNoPassword(id);
			if (user != null) {
				rep.setStatus("OK");
				rep.setObject(user);
			} else {
				rep.setStatus("KO");
				rep.setMessage("User not found to update ");
			}
		} catch (Exception e) {
			rep.setStatus("KO");
			rep.setMessage(e.getMessage());
			this.logger.error(e.getStackTrace().toString());
		}

		return rep;
	}

}
