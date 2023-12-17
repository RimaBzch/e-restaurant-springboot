package com.api.restaurant.resto;

//import java.util.HashSet;
//import java.util.Set;

//import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
//import org.springframework.context.annotation.Bean;
//import org.springframework.data.mongodb.core.MongoTemplate;

//import com.api.restaurant.resto.Repository.UserRepository;
//import com.api.restaurant.resto.beans.User;

@SpringBootApplication
@EnableScheduling // this annotation enables scheduling
public class RestoApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestoApplication.class, args);
	}
	
	/*@Bean
	CommandLineRunner runner(UserRepository userRepo, MongoTemplate mt)
	{
		Set<String> role = new HashSet<String>();
		role.add("DELIVERY");
		return args -> {
			User user1 = new User("del","del@gmail.com","123456",role,"",true,true,true,true,true);
		    //1 st way by logic and query
			/*Query q = new Query();
		    String email = "mostfa@gmail.com";
		    q.addCriteria(Criteria.where("email").is(email));
		    
		    List<User> users=  mt.find(q, User.class);
			if(users.size() > 1)
			{
				throw new IllegalStateException("found many users with email"+ email);
			}
			if(users.isEmpty()) {
				System.out.println("insert user "+user1);
		      userRepo.insert(user1);
			}
			else
				System.out.println("user exist user "+user1);
			    */
	
	    //second way 	
		/*	String email = "del@gmail.com";
			userRepo.findUserByEmail(email)
			.ifPresentOrElse(s -> {
			System.out.println(user1+"already exist");
			},
			() -> {
				System.out.println(user1+"Inserting ..");
				userRepo.insert(user1);
			}		
			);
		};
	}*/

}
