package com.api.restaurant.resto.security;

public enum ApplicationUserPermission {
  COMMAND_READ("commond:read"),
  COMMAND_WRITE("commond:write"),
  USER_READ("user:write"),
  USER_WRITE("user:read");
	
  private final String permission;
  
  ApplicationUserPermission(String permission)
  {
	  this.permission = permission;
  }
  
  public String getPermission()
  {
	  return permission;
  }
}
