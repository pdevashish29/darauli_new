package com.darauli.pdp.controller;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

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

import com.darauli.pdp.dao.LoginDao;
import com.darauli.pdp.entity.Registration;

@Controller
@SessionAttributes("otpToken")
public class RegistrationController {

	@Autowired
	private LoginDao loginDao;
	
	private Registration userInfo;
	
	
	
	@RequestMapping("/registration")
	public String getSignUpPage(Model model){
		model.addAttribute("registrion", new Registration());
		return "registration";
	}
	
	@RequestMapping(value="/registration", method=RequestMethod.POST)
	public String ProcessSignUp(@ModelAttribute("registration") Registration user, Model model , HttpSession session,BindingResult result){
		if(result.hasErrors()){
			return "redirect:/registration";
		}
		int i =	loginDao.registerUser(user);
		if(i>0){
			model.addAttribute("userId", i);
			 String otp=SimpleOTPGenerator.random(6);
			model.addAttribute("otpToken", otp);
			System.out.println(otp);
			return "varifyMe";	
		}else{
			return "redirect:/registration";
			}
		
	}
	
	@RequestMapping(value="/varifyMe" , method=RequestMethod.POST)
	public String varifyUser(Model model,HttpSession session, @RequestParam(value="otp", required=true) String otp){
		
	String tokenFromSession=	(String)session.getAttribute("otpToken");
	if(tokenFromSession.equals(otp)){
		return "welcome";
	}
		return "varifyMe";
	}
}
 class SimpleOTPGenerator {


    protected SimpleOTPGenerator() {
    }

    public static String random(int size) {

        StringBuilder generatedToken = new StringBuilder();
        try {
            SecureRandom number = SecureRandom.getInstance("SHA1PRNG");
            // Generate 20 integers 0..20
            for (int i = 0; i < size; i++) {
                generatedToken.append(number.nextInt(9));
            }
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        return generatedToken.toString();
    }
}