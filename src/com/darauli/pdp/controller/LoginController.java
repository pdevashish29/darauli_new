package com.darauli.pdp.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.jasypt.util.password.StrongPasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;

import com.darauli.pdp.dao.LoginDao;
import com.darauli.pdp.entity.Registration;

@Controller
public class LoginController {
	@Autowired
	private LoginDao loginDao;
	
	@RequestMapping("/handleLogin")
	private String throghDLoginPage(){
		return "login";
	}
	
	@RequestMapping(value="/handleLogin", method=RequestMethod.POST)
	public String handleLogin(Model model,@RequestParam(value="username") String username,	@RequestParam(value="password") String password,HttpSession session){
		String message = "";
		Registration getUserInfo=null;
		if((username != null && !("").equals(username)) && (password != null && !("").equals(password))){
			getUserInfo =loginDao.login(username, password);
		if(getUserInfo!=null){
			if("".equals(getUserInfo.getPassword().trim())){
				message= "Invalid credentials.";
				model.addAttribute("message",message);
				return "login";			
			} else  {
				model.addAttribute("USERINFO", getUserInfo);
				return "dashboard";
			}
		}
		}else
		message= "Invalid credentials.";
		model.addAttribute("message",message);
		return "login";			
	}
	
	
	@RequestMapping(value="/logout", method=RequestMethod.GET)
	public String gologoutPage(Model model, HttpSession session, SessionStatus status){
		if(session !=null) {
		status.setComplete();
	    //session.removeAttribute("userInfo");
		session.invalidate();
		//session.removeAttribute("userInfo");
		}
	 return "login";
		
	}
}	
		
		
	


