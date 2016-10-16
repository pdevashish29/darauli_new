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
	
	@RequestMapping("/registration")
	public String getSignUpPage(Model model){
		model.addAttribute("registrion", new Registration());
		return "registration";
	}
	
	@RequestMapping(value="/registration", method=RequestMethod.POST)
	public String ProcessSignUp(@ModelAttribute("registration") Registration user, Model model , BindingResult result){
		if(result.hasErrors()){
			return "redirect:/registration";
		}
		int i =	loginDao.registerUser(user);
		if(i>0){
			model.addAttribute("userd", i);
			return "redirect:/";	
		}else{
			return "redirect:/registration";
			}
		
	}}	
		
		
	


