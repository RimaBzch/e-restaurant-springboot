package com.api.restaurant.resto.auth;

import java.util.Collection;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.api.restaurant.resto.beans.User;

public class ApplicationUser implements UserDetails {

	 /**
	 * 
	 */
	
	
	private static final long serialVersionUID = 5214824057307897417L;
	
	private final Set<? extends GrantedAuthority> grantedAuthorities;
	 private final String password;
	 private final String username;
	 private final boolean isAccountNonExpired;
	 private final boolean isAccountNonLocked;
	 private final boolean isCredentialsNonExpired;
	 private final boolean isEnabled;	
	 
	 public ApplicationUser(Set<? extends GrantedAuthority> grantedAuthorities, String password, String username,
			boolean isAccountNonExpired, boolean isAccountNonLocked, boolean isCredentialsNonExpired,
			boolean isEnabled) {
		super();
		this.grantedAuthorities = grantedAuthorities;
		this.password = password;
		this.username = username;
		this.isAccountNonExpired = isAccountNonExpired;
		this.isAccountNonLocked = isAccountNonLocked;
		this.isCredentialsNonExpired = isCredentialsNonExpired;
		this.isEnabled = isEnabled;
	}

	 @Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return grantedAuthorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return isAccountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return isAccountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return isCredentialsNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return isEnabled;
	}

}
