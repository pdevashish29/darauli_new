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
   
   
   
  <h1> {{hello}}</h1>
   
   
   
   
   

    </div> <!-- /container -->
<%-- <jsp:include page="/WEB-INF/views/component/footer.jsp"></jsp:include> --%>
</body>
</html>
<script type="text/javascript">
	$(function () {
		  $('#toDateSpan').datetimepicker({
	        	format: 'MM/DD/YYYY',
	        	defaultDate: '<%=toDate%>'
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