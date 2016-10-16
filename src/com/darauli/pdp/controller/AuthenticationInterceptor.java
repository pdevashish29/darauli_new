package com.darauli.pdp.controller;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.darauli.pdp.entity.Registration;

//@Component
public class AuthenticationInterceptor{ //extends HandlerInterceptorAdapter {
	
	/*@Override
	public boolean preHandle(HttpServletRequest request,
	   HttpServletResponse response, Object handler) throws Exception
	 {
		Registration userData = (Registration) request.getSession().getAttribute("USERINFO");
		if(userData == null)
		   {
		    response.sendRedirect(request.getContextPath()+"/");
	           return false;
		   }
		  return true;
		 }*/
}
