package com.api.restaurant.resto.security;

import static com.api.restaurant.resto.security.ApplicationUserRole.ADMIN;
import static com.api.restaurant.resto.security.ApplicationUserRole.USER;
import static com.api.restaurant.resto.security.ApplicationUserRole.DELIVERY;
import static com.api.restaurant.resto.security.ApplicationUserPermission.COMMAND_WRITE;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import com.api.restaurant.resto.service.ApplicationUserService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	private final PasswordEncoder passwordEncoder;
	private final ApplicationUserService applicationUserService;
	private final String corsAllowedOrigin = "http://localhost:4200";
	private List<String> corsAllowedOrigins = new ArrayList<>();

	@Autowired
	public WebSecurityConfig(PasswordEncoder passwordEncoder, ApplicationUserService applicationUserService) {
		this.corsAllowedOrigins.add(corsAllowedOrigin);
		this.corsAllowedOrigins.add("https://js.stripe.com");
		this.passwordEncoder = passwordEncoder;
		this.applicationUserService = applicationUserService;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				 .csrf().disable()
				//.csrf()
				//.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
			//	.and()
				.authorizeRequests()
				
				.antMatchers("/", "index", "/css/*", "/js/*").permitAll()
				.antMatchers("/api/v1/signup").permitAll()
	     		//.antMatchers("/payment/charge").hasAnyRole(USER.name())
				.antMatchers("/api/v1/auth").permitAll()//hasAnyRole(USER.name(), ADMIN.name(), DELIVERY.name())// hasRole(ADMIN.name())
				.antMatchers("/order/save").permitAll()//.permitAll()
				.antMatchers("/order/savee").permitAll()
				.antMatchers(HttpMethod.DELETE,"/api/v1/**").hasAuthority(COMMAND_WRITE.getPermission())
				 /* .antMatchers(HttpMethod.POST,"/api/v1/**").hasAuthority(COMMAND_WRITE.
				 * getPermission())
				 * .antMatchers(HttpMethod.PUT,"/api/v1/**").hasAuthority(COMMAND_WRITE.
				 * getPermission())
				 */ // .antMatchers(HttpMethod.POST,"/api/v1/**").hasRole(ADMIN.name())//.permitAll()//(USER.name(),ADMIN.name())
				.antMatchers(HttpMethod.POST, "/product/**").hasAuthority(COMMAND_WRITE.getPermission())
				.antMatchers(HttpMethod.GET, "/product/**").permitAll()
				.antMatchers(HttpMethod.DELETE, "/product/**").hasAnyRole(ADMIN.name())
				// .permitAll()
				//.antMatchers("/payment/charge").authenticated()
				//.antMatchers("/api/v1/signup").authenticated()
				.antMatchers("/websocket/*").permitAll()
				.and()
				.httpBasic()
				// .and()
				// .formLogin()
				// .loginPage("/login").permitAll()
				// .defaultSuccessUrl("/command",true)
				.and()
				.formLogin()
                .loginPage("/login")
                .defaultSuccessUrl("/")
                .permitAll()
                .and()
            .logout()
                .logoutSuccessUrl("/login?logout")
                .permitAll()
                .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
				.and()
				.rememberMe()
				.tokenValiditySeconds((int) TimeUnit.DAYS.toSeconds(21)).key("somethingverysecured")
				.and()
				.logout()
				.logoutUrl("/logout")
				.clearAuthentication(true).invalidateHttpSession(true)
				.deleteCookies("JSESSIONID", "remember-me");
		// .logoutSuccessUrl("/login")
		//;

		// http.authorizeRequests()
		// .antMatchers("/api/v1/users", "/public/**").permitAll()
		// .antMatchers("/users/**").hasAuthority("ADMIN")
		// .anyRequest().permitAll();//fullyAuthenticated();
		// .and()
		// .formLogin()
		/*
		 * .loginPage("/login") .failureUrl("/login?error") .usernameParameter("email")
		 * .permitAll() .and() .logout() .logoutUrl("/logout")
		 * .deleteCookies("remember-me") .logoutSuccessUrl("/") .permitAll() .and()
		 * .rememberMe();
		 */
	}

	/*
	 * @SuppressWarnings("deprecation")
	 * 
	 * @Bean
	 * 
	 * @Override public UserDetailsService userDetailsService() { UserDetails user =
	 * User.withDefaultPasswordEncoder().username("user").password("password").roles
	 * ("USER") .build();
	 * 
	 * return new InMemoryUserDetailsManager(user); }
	 */

	/*
	 * @Bean
	 * 
	 * @Override public UserDetailsService userDetailsService() { UserDetails user =
	 * User .builder() .username("user")
	 * .password(passwordEncoder.encode("password")) // .roles(ADMIN.name())
	 * //ROLE_USER .authorities(ADMIN.getGrantedAuthorites()) .build();
	 * 
	 * 
	 * UserDetails user1 = User .builder() .username("mostfa")
	 * .password(passwordEncoder.encode("pass1234")) // .roles(ADMIN.name())
	 * //ROLE_USER .authorities(ADMIN.getGrantedAuthorites()) .build();
	 * 
	 * UserDetails user2 = User .builder() .username("mostfa1")
	 * .password(passwordEncoder.encode("pass1234")) //.roles(USER.name())
	 * //ROLE_USER .authorities(USER.getGrantedAuthorites()) .build();
	 * 
	 * return new InMemoryUserDetailsManager(user,user1,user2); }
	 */

	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilter() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.setAllowedOrigins(corsAllowedOrigins); // @Value: http://localhost:8080
		config.addAllowedHeader("*");
		config.addAllowedMethod("HEAD");
		config.addAllowedMethod("GET");
		config.addAllowedMethod("PUT");
		config.addAllowedMethod("POST");
		config.addAllowedMethod("DELETE");
		config.addAllowedMethod("PATCH");
		// config.addAllowedOrigin("*");
		source.registerCorsConfiguration("/**", config);
		FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<CorsFilter>(new CorsFilter(source));
		bean.setOrder(0);
		return bean;
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(daoAuthenticationProvider());
	}

	@Bean
	public DaoAuthenticationProvider daoAuthenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setPasswordEncoder(passwordEncoder);
		provider.setUserDetailsService(applicationUserService);
		return provider;
	}

	@Bean
	HandlerExceptionResolver errorHandler() {
		return new HandlerExceptionResolver() {

			@Override
			public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response,
					Object handler, Exception ex) {
				ModelAndView model = new ModelAndView("error-page");
				model.addObject("exceptionType", ex);
				model.addObject("handlerMethod", handler);
				return model;
			}
		};
	}

}
