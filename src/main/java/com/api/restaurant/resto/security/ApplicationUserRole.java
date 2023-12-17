package com.api.restaurant.resto.security;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.google.common.collect.Sets;

import static com.api.restaurant.resto.security.ApplicationUserPermission.*;

public enum ApplicationUserRole {
	USER(Sets.newHashSet(COMMAND_WRITE, USER_READ)),
	ADMIN(Sets.newHashSet(COMMAND_READ, COMMAND_WRITE, USER_READ, USER_WRITE)),
	DELIVERY(Sets.newHashSet(COMMAND_READ)),
	RECEPTION(Sets.newHashSet(COMMAND_READ));

	private final Set<ApplicationUserPermission> permissions;

	ApplicationUserRole(Set<ApplicationUserPermission> permissions) {
		this.permissions = permissions;
	}

	public Set<ApplicationUserPermission> getPermissions() {
		return permissions;
	}

	public Set<SimpleGrantedAuthority> getGrantedAuthorites() {
		Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
				.map(permission -> new SimpleGrantedAuthority(permission.getPermission())).collect(Collectors.toSet());
		permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
		return permissions;
	}
}
