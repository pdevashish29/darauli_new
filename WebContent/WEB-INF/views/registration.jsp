<%@page import="java.util.Calendar"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@page import="java.util.GregorianCalendar"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.util.Date"%>  
<% 
	String path = request.getContextPath();
	Calendar cal = Calendar.getInstance();
	Date date=new Date();	
	int month=date.getMonth();
	int year=date.getYear();
	int dat=date.getDate();
	year=year+1900;
	SimpleDateFormat format = new SimpleDateFormat("MM/dd/YYYY");
	Calendar c = Calendar.getInstance();    
	c.set(year,month,1); 
	c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
	String toDate=format.format(c.getTime());
	String fromDate=(month+1)+"/"+01+"/"+year;
%>
<!DOCTYPE html>
<html lang="en" data-ng-app="myApp">
<head>
  <title>Estimates</title>
  	<meta charset="utf-8">
  	<meta name="viewport" content="width=device-width, initial-scale=1">
   	<meta name="description" content="By parashar Devashish">
   	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<link rel="stylesheet" href="<%=path%>/resources/css/bootstrap.min.css" style="text/css">
	<script type="text/javascript" src="<%=path%>/resources/js/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="<%=path%>/resources/js/angular.min.js"></script>
	<script type="text/javascript" src="<%=path%>/resources/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="<%=path%>/resources/js/kendo.all.min.js"></script>
	<link rel="stylesheet" href="<%=path%>/resources/css/bootstrap-datetimepicker.css" type="text/css" />
	<script src="<%=path%>/resources/js/moment-with-locales.js"></script>
	<script src="<%=path%>/resources/js/bootstrap-datetimepicker.js"></script>
 	<script type="text/javascript">
 		var app = angular.module('myApp',[]);
 		app.controller('myDarauliController',function($scope,$http){
 			$scope.hello="welcome to AngularJS";
 			$scope.items='';
 		});
 	</script>
</head>
<body data-ng-controller="myDarauliController">
<jsp:include page="/WEB-INF/views/component/header.jsp"></jsp:include>
<br><br></br></br>
 <div class="container">
<form action="<%=path %>/registration" method="post" class="form-horizontal">
<div class="form-group">
    <label class="control-label col-xs-4" for="firstName">First Name:</label>
    <div class="col-xs-4">
      <input type="text" class="form-control" id="firstName" name ="firstName" >
    </div>
  </div>
  
  
  <div class="form-group">
    <label class="control-label col-xs-4" for="firstName">Last Name:</label>
    <div class="col-xs-4">
      <input type="text" class="form-control" id="lastName" name ="lastName" >
    </div>
  </div>
  
  <div class="form-group">
    <label class="control-label col-xs-4" for="email">Email:</label>
    <div class="col-xs-4">
      <input type="email" class="form-control" id="email" name  ="email" >
    </div>
  </div>
  
 
  
   <div class="form-group">
    <label class="control-label col-xs-4" for="email">User Name:</label>
    <div class="col-xs-4">
      <input type="text" class="form-control" id="userName" name ="username" >
    </div>
  </div>
  
  
  
  <div class="form-group">
    <label class="control-label col-xs-4" for="pwd">Password:</label>
    <div class="col-xs-4"> 
      <input type="password" class="form-control" id="password" name ="password" >
    </div>
  </div>
  
  
  <div class="form-group">
    <label class="control-label col-xs-4" for="pwd">Gender:</label>
    <div class="col-xs-4"> 
  		<label class="radio-inline"><input type="radio" name="gender" value="M">Male </label>
		<label class="radio-inline"><input type="radio" name="gender" value="F">Female </label>
    </div>
  </div>
  
  
  
   <div class="form-group">
    <label class="control-label col-xs-4" for="dateOFBirth">Date Of Birth:</label>
    <div class="col-xs-4">
      <input type="text" class="form-control" id="dateOfBirth" name ="dateOfBirth">
    </div>
  </div>
  
  
   <div class="form-group">
    <label class="control-label col-xs-4" for="phoe">Phone:</label>
    <div class="col-xs-4">
      <input type="text" class="form-control" id="phone" name ="phone" >
    </div>
  </div>
  
  
  
   <div class="form-group">
    <label class="control-label col-xs-4" for="phoe">Address:</label>
    <div class="col-xs-4">
      <input type="text" class="form-control" id="address" name ="address" >
    </div>
  </div>
  
  
  
    <div class="form-group">
    <label class="control-label col-xs-4" for="phoe">Street:</label>
    <div class="col-xs-4">
      <input type="text" class="form-control" id="street" name ="street" >
    </div>
  </div>
  
  
  
    <div class="form-group">
    <label class="control-label col-xs-4" for="phoe">City:</label>
    <div class="col-xs-4">
      <input type="text" class="form-control" id="city" name ="city" >
    </div>
  </div>
  
  
  
  
    <div class="form-group">
    <label class="control-label col-xs-4" for="phoe">Satate:</label>
    <div class="col-xs-4">
      <input type="text" class="form-control" id="street" name ="state">
    </div>
    </div>
    
    
   <div class="form-group">
    <label class="control-label col-xs-4" for="poe">Country:</label>
    <div class="col-xs-4">
      <input type="text" class="form-control" id="country" name ="country" >
    </div>
  </div>
  
  
   <div class="form-group">
    <label class="control-label col-xs-4" for="poe">Zip</label>
    <div class="col-xs-4">
      <input type="text" class="form-control" id="" name ="zipcode" >
    </div>
  </div>
  
    
  <div class="form-group"> 
    <label class="control-label col-xs-4" for="pwd">&nbsp;</label>
    <div class=" col-xs-4">
      <button type="submit" class="btn btn-default">Submit</button>
    </div>
  </div>
</form>

    </div> <!-- /container -->
<%-- <jsp:include page="/WEB-INF/views/component/footer.jsp"></jsp:include> --%>
</body>
</html>
<script type="text/javascript">
	$(function () {
		  $('#dateOfBirth').datetimepicker({
	        	format: 'MM/DD/YYYY',
	        	defaultDate: '<%=fromDate%>'
	        });
	        
	        $('#fromDateSpan').datetimepicker({
	        	format: 'MM/DD/YYYY',
	        	defaultDate: '<%=fromDate%>'
	        });
		
	        $('#searchDate1').datetimepicker({
	        	format: 'MM/DD/YYYY',
	        	defaultDate: '<%=fromDate%>'
	        });
		
		
        
    });
</script>
