package com.darauli.pdp.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import com.darauli.pdp.dao.LoginDao;
import com.darauli.pdp.entity.Registration;

@Controller
@SessionAttributes("userInfo")
public class LoginController {
	@Autowired
	private LoginDao loginDao;
	
	private Registration userInfo;
	
	@RequestMapping("/handleLogin")
	private String throghDLoginPage(HttpSession session, Model model){
		userInfo=(Registration)session.getAttribute("userInfo");
		if(userInfo!=null){
			return "dashboard";
		}
		model.addAttribute("userInfo", new Registration());	
		return "login";
	}
	
	@RequestMapping(value="/handleLogin", method=RequestMethod.POST)
	public String handleLogin(Model model,@RequestParam(value="username") String username,	@RequestParam(value="password") String password,HttpSession session){
		String message = "";
		userInfo=null;
		if((username != null && !("").equals(username)) && (password != null && !("").equals(password))){
			userInfo =loginDao.login(username, password);
		if(userInfo!=null){
			if("".equals(userInfo.getPassword().trim())){
				message= "Invalid credentials.";
				model.addAttribute("message",message);
				return "login";			
			} else  {
				model.addAttribute("userInfo", userInfo);
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
		
