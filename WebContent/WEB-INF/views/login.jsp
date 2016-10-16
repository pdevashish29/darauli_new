<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%
   String path= request.getContextPath();
   String message=(String)request.getAttribute("message");
   if(message==null)message="";
   
 %>
<!DOCTYPE html>
<html lang="en" data-ng-app="myApp">
<head>
  <title>Admin</title>
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

<style type="text/css">
	body {
	 	 min-height:200px;
	     padding-top: 10px;
		}
		.form-signin {
		  max-width: 360px;
		  padding: 15px;
		  margin: 0 auto;
		  margin-top:40px
		}
		.form-signin .form-signin-heading,
		.form-signin .checkbox {
		  margin-bottom: 10px;
		  margin-top:-2px;
		}
		.form-signin .checkbox {
		  font-weight: normal;
		}
		.form-signin .form-control {
		  position: relative;
		  height: auto;
		  -webkit-box-sizing: border-box;
		     -moz-box-sizing: border-box;
		          box-sizing: border-box;
		  padding: 10px;
		  font-size: 16px;
		}
		.form-signin .form-control:focus {
		  z-index: 2;
		}
		.form-signin input[type="email"] {
		  margin-bottom: -1px;
		  border-bottom-right-radius: 0;
		  border-bottom-left-radius: 0;
		}
		.form-signin input[type="password"] {
		  margin-bottom: 10px;
		  border-top-left-radius: 0;
		  border-top-right-radius: 0;
		}
	#login {
				background-color: #f5f5f5;
				border-radius: 5px;
				box-shadow: 0 5px 5px #a7a7a7;
				height: 340px;
				margin: auto;
				position: relative;
				top: 15%;
				width: 363px;
				min-height: 400px;
				
			}
	</style>
</head>
<body>
<jsp:include page="/WEB-INF/views/component/header.jsp"></jsp:include>
<br>
<div id="login">
  <form class="form-signin"  action="<%=path%>/handleLogin" method="post">
        <img src="<%=path%>/resources/image/photo.png" style="height: 120px; border-radius: 60px; width: 120px; margin: 0px auto; position: absolute; left: 120px; top: 13px;">
        <input type="text" class="form-control"  placeholder="User name"  autofocus style="width:330px;margin-top:135px;" name="username">
        <input type="password" class="form-control" placeholder="Password"  style="width:330px;margin-top:3px;" name="password">
        <p style="position: absolute;margin-top:-6px;color:red"><%=message %></p>
        <button class="btn  btn-primary btn-block" type="submit" style="height:50px;margin-top:24px">Sign in</button>
      </form>
      <a href="<%=path %>/trouble">Forget Something </a>
      <a  style="margin-left: 167px;" href="<%=path %>/signUp">New User</a>
      </div>
</body>
</html>