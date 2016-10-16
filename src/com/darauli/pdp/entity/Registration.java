package com.darauli.pdp.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Registration {

	@Id
	@GeneratedValue
	private int id;
	private String firstName;
	private String lastName;
	private String email;// userName
	private String username;
	private String password;
	private String gender;
	private Date dateOfBirth;
	private String phone;
	
	private String address;
	private String street;
	private String city;
	private String state;
	private String country;
	private int zipcode;
	
	private Date registartionDate= new Date();
	private char invalid_flag='Y';
	private char delete_flag='N';
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public Date getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public int getZipcode() {
		return zipcode;
	}
	public void setZipcode(int zipcode) {
		this.zipcode = zipcode;
	}
	public Date getRegistartionDate() {
		return registartionDate;
	}
	public void setRegistartionDate(Date registartionDate) {
		this.registartionDate = registartionDate;
	}
	public char getInvalid_flag() {
		return invalid_flag;
	}
	public void setInvalid_flag(char invalid_flag) {
		this.invalid_flag = invalid_flag;
	}
	public char getDelete_flag() {
		return delete_flag;
	}
	public void setDelete_flag(char delete_flag) {
		this.delete_flag = delete_flag;
	}
	
	
	
}
