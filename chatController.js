var chatController =  ['$compile','$scope','$rootScope','$state','$sessionStorage',  function($compile,$scope, $rootScope, $state, $sessionStorage,$filter,$interval) {
	
	var db =firebase.database();// root referance of firebase 
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||   navigator.mozGetUserMedia;
	$scope.currentUser=$scope.$storage.session.user;
	var uniqueId= $scope.currentUser.uniqueId;
	var email= $scope.$storage.session.email;
	$scope.email=email;
	$scope.defaultUserImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz-_3M-pHdWyfIr__MPZOSsKPq1hBAUhdwl4MMkSKmtcEJRk0g";
	$scope.logoImageUrl="https://firebasestorage.googleapis.com/v0/b/vflip-83ae2.appspot.com/o/vflipLogo.png?alt=media&token=6d407cf4-56f0-4348-a475-ff6ca18ee571";
	$scope.meetingImageUrl ="https://firebasestorage.googleapis.com/v0/b/vflip-1355c.appspot.com/o/group.png?alt=media&token=2f96fcab-1c22-4086-aacf-1064f71f420d";
	$scope.friend='';
	$scope.friendEmail='';
	$scope.isMeetingStarted=false;
	
	// firebase  utility methods 
	$scope.getUniqueNumber= function(){
		var uniqueId =new Chance().natural({min:100000,max:999999});
		//console.log(uniqueId);
		return uniqueId+"";
	}
	
	$scope.startCamera= function(){
		navigator.getUserMedia({audio: true, video: true}, function(stream){
				window.localStream = stream;
				attachMediaStream( $('#my-video0')[0], stream );
		}, function(error){
				console.log(error);
		});
	}//  end of starting camera 
	
	
	// delete
	$scope.deleteData= function(url ){
		if(url!=undefined){
			db.ref(url).remove().then(function(){
				return true;
			}).catch(function(error){
				return false;
			});
		}
	}
	// save 
	$scope.saveData= function(url , dataObject){
		if(url !=undefined && dataObject!= undefined ){
			db.ref(url).set(dataObject).then(function(){
				return true;
			}).catch(function(error){
				return false;
			});
		}else{
			return false;
		}
	}
	// update
	$scope.updateData= function(url , dataObject){
		if(url !=undefined && dataObject!= undefined ){
			db.ref(url).update(dataObject).then(function(){
				return true;
			}).catch(function(error){
				return false;
			});
		}else{
			return false;
		}
	}

	
	var peer;
	$scope.connectToNetwork= function(uniqueId){
			peer= new Peer([uniqueId],{key: '79424c28-1c5c-48fb-9044-a5d94693e10b'});	
			console.log(peer);
	}
	
	$scope.connectToNetwork(uniqueId);
	$scope.updateData("/userDetails/"+email,{status:'online'});
	
	peer.on('open', function(id){
		console.log("network connection established on peerID   " +peer.id) ;
	});
	
	peer.on('error', function(err){
		console.log("network connection failed on peerID  "+err) ;
	}); 
	
	
	$scope.startCamera();
	
	peer.on('call', function(call){
		console.log(" in comming call and accepting  " +call) ;
		call.answer(window.localStream);
		$scope.streamResources(call);
	}); 


//	start code for meeting area 
 	var meetingJoinRequestRef;
   	$scope.startMeeting= function(){
   		$scope.isMeetingStarted=true;
   		$scope.meetingID=$scope.getUniqueNumber();
   		//$scope.connectToNetwork($scope.meetingID);// creating meeting on random string of num
   		participants=0;
   		$scope.updateData("/userDetails/"+$scope.email,{status :'onCall'});
		$scope.updateData("/meetings/_ids/",{ [email] : $scope.meetingID });
   		$scope.saveData("/meetings/meetingDetails/"+$scope.meetingID, { conferenceTopic:"discussion",meetingId:$scope.meetingID+"",[email]:"conferenceAdmin"});
   	   	var meetingJoinRequestRef =db.ref("/meetings/conferenceJoinRequest/"+$scope.meetingID);
   	   	meetingJoinRequestRef.on('child_added' , function(snapshot){
   	   	   	console.log(snapshot.key +"  " +snapshot.val());
   	   	   	
   	   	   	if(snapshot.val().callResult=='reject'){
   	   	   	
   	   		
   	   	   	}else if(snapshot.val().callResult=='callCut'){
   	   	   		
   	   	   	
   	   	   		
   	   	   	}else{
	   	   	  $scope.$apply(function(){
	 	   	   		$scope.participantsEmail=snapshot.key;
	 	   	   		$scope.participantsId=snapshot.val();
	 	   	   		$('#meetingAcceptRejectModal').modal({show:true, backdrop:'static', keyboard: false});
	 	   	   	});
   	   	   	}
   	   	   	});
   	}	
  
   	
   	$scope.success='';
   	$scope.meetingIdtext=undefined;
 	$scope.joinMeetingRequest= function(){
 		if($scope.meetingIdtext!=undefined){
 			var meetingRef=db.ref("/meetings/_ids/").orderByValue().equalTo($scope.meetingIdtext);
 			meetingRef.once('value').then(function(snapshot){
 				console.log(snapshot.key +"  "+snapshot.val());
 				if(snapshot.val()!=null){
 					$scope.updateData("/userDetails/"+$scope.email,{status :'onCall'});
 					$scope.saveData("/meetings/conferenceJoinRequest/"+$scope.meetingIdtext,{[email]:uniqueId});
 		 			$('#joinMeetingRequestModal').modal({show:true, backdrop:'static', keyboard: false});
 		 			
 		 			db.ref("/meetings/conferenceJoinRequest/"+$scope.meetingIdtext+"/"+[email]).on('child_added', function(data){
 		 				$('#joinMeetingRequestModal').modal('hide'); 
 		 				if($scope.meetingIdtext==undefined){
 		 					$scope.deleteData("/meetings/conferenceJoinRequest/"+$scope.meetingID+"/"+ $scope.email);
 		 				}else{
 		 					$scope.deleteData("/meetings/conferenceJoinRequest/"+$scope.meetingIdtext+"/"+ $scope.email);
 		 				}
 		 				
 		 				/*if(data.val()=='reject'){
	 	 					$('#joinMeetingRequestModal').modal('hide'); 
	 	 				}else if (data.val()=='callCut'){
	 	 					$('#joinMeetingRequestModal').modal('hide'); 
	 	 					$scope.deleteData("/meetings/conferenceJoinRequest/"+$scope.meetingIdtext+"/"+ $scope.participantsEmail);
	 	 				}else if(data.val()=='accept'){
	 	 					$('#joinMeetingRequestModal').modal('hide'); 
	 	 				}*/
	 	 				
	 	 			});
 		 			
 		 			db.ref("/meetings/conferenceJoinRequest/"+$scope.meetingIdtext+"/"+[email]).on('child_changed', function(data){
 		 				$('#joinMeetingRequestModal').modal('hide'); 
 		 				if($scope.meetingIdtext==undefined){
 		 					$scope.deleteData("/meetings/conferenceJoinRequest/"+$scope.meetingID+"/"+ $scope.email);
 		 				}else{
 		 					$scope.deleteData("/meetings/conferenceJoinRequest/"+$scope.meetingIdtext+"/"+ $scope.email);
 		 				}
	 	 			});
 		 			
 		 			
 				}else{
 					alert("Invalid meeting ID ");
 					$scope.meetingIdtext=undefined;
 				}
 			});
 		}else{
 			alert("Missing input");
 		}
 	}
 	
 	
 	$scope.cancelMeetingRequest= function(){
 		$scope.updateData("/userDetails/"+$scope.email,{status :'online'});
 		$scope.saveData("/meetings/conferenceJoinRequest/"+$scope.meetingIdtext+"/"+[email],{'callResult':'reject'});
 		
 	}
 	
 	
 	$scope.acceptMeeting= function(){
 		$('#meetingAcceptRejectModal').modal('hide');
 		//console.log("acceptMeeting " +$scope.participantsEmail +" " +$scope.participantsId );
 		$scope.saveData("/meetings/conferenceJoinRequest/"+$scope.meetingID+"/"+ $scope.participantsEmail,{'callResult':'accept'})
 		setTimeout(function(){ 
				var call = peer.call($scope.participantsId, window.localStream);
				$scope.streamResources(call);
				console.log(" ------------------------ calling to user");
				//$scope.deleteData("/meetings/conferenceJoinRequest/"+$scope.meetingID+"/"+ $scope.participantsEmail);
			}, 4000);
 	}
 	
 	$scope.rejectMeeting= function(){
 		$('#meetingAcceptRejectModal').modal('hide');
 		$scope.updateData("/userDetails/"+$scope.participantsEmail,{status :'online'});
 		$scope.updateData("/meetings/conferenceJoinRequest/"+$scope.meetingID+"/"+ $scope.participantsEmail,{'callResult':'reject'} );
 		/*setTimeout(function(){ 
 			$scope.deleteData("/meetings/conferenceJoinRequest/"+$scope.meetingID+"/"+ $scope.participantsEmail);
		}, 4000);*/
 	}
 	
 
 	
   	// START LISENTING FOR MeetingJoinRequest in firebase 
   
 	
 	/*start  of making  call*/
	$scope.makeCall= function(emailOther, value){
		console.log( "$scope.makeCall emailOther , value " + emailOther, value);
		switch(value.status) {
		case "online":
			$scope.saveData("/calls/"+email,{callTo:emailOther});
			$scope.saveData("/calls/"+emailOther,{callFrom:email});
			$scope.updateData("/userDetails/"+email,{status:'onCall'});
			$scope.updateData("/userDetails/"+emailOther,{status:'onCall'});
			$scope.friend=value;
			$scope.friendEmail=emailOther;
			$('#callingModal').modal({show:true,backdrop:'static', keyboard: false}); // dialer open here 
			break;
		case "onCall":
			alert("User is busy");
			break;
		case "offline":
			alert("User is offline");
			break;
		default:
			alert("User is offline");
		}
	}
	
	/*end   of making  call*/
	
	$scope.cancelCall= function(){
		$('#callingModal').modal('hide');
		$scope.updateData("calls/"+$scope.email,{callResult: 'reject'});
		$scope.updateData("calls/"+$scope.friendEmail,{callResult: 'reject'});
	}
	
	$scope.acceptCall= function(){
		console.log("acceptCall");
		// FOR NOTIFICATION  CALL RESULT STATUS TO ACCEPT 
		$scope.updateData("calls/"+email,{callResult: 'accept'});
		$scope.updateData("calls/"+$scope.friendEmail,{callResult: 'accept'});
		$('#incomingCallModal').modal('hide');
	};

	$scope.rejectCall= function(){
		$scope.updateData("calls/"+$scope.email,{callResult: 'reject'});
		$scope.updateData("calls/"+$scope.friendEmail,{callResult: 'reject'});
		$('#incomingCallModal').modal('hide');
	};
	
	$scope.hangUp= function(){
		console.log("hangup ...........................................");
		if($scope.email != undefined){
			db.ref("/calls/"+$scope.email).update({callResult:'callCut'});
		}
		if($scope.friendEmail!=undefined){
	     	db.ref("calls/"+$scope.friendEmail).update({callResult: 'callCut'});
		}
		 $('#my-video').prop('src', "");
	}
	
//	START LISTENING FOR INCOMMING CALLS NOTIFICATION  IN FIREBASE 
	$scope.caller='';
	$scope.isDailer=false;
	db.ref("/calls/"+email).on('child_added', function(data) {
		console.log("child_added   ------------------------------------------------------"+ data.key +" :- " + data.val());
		if(data.key.toString()=='callFrom' ){
			$scope.isDailer=false;
			var callerEmail=data.val();
			db.ref("/userDetails/"+callerEmail).once('value').then(function(snapshot){
				$scope.$apply(function(){
					$scope.friend=snapshot.val();
					$scope.friendEmail=snapshot.key;
					$('#incomingCallModal').modal({show:true, backdrop:'static', keyboard: false});
				});
			});
		}

		if(data.key.toString()=='callTo'){
			console.log("childAdded_callTo............" +data.key+ " :-" +data.val());
			$scope.isDailer=true;
		}
		if(data.key.toString()=='callResult'){
			console.log("childAdded_callResult............"+data.key+ " :- " +data.val());
			if(data.val()=='accept'){
				console.log("accept   ---------------------");
				$scope.callResult="accepted"; // msg for user
				$('#callingModal').modal('hide');
				$scope.closeNav();
				$scope.call_cutBtn=true;
				if($scope.isDailer==true){ 	
				var id =$scope.friend.uniqueId;
				$scope.$apply(function(){
					$scope.callResult="connecting";
				});
				setTimeout(function(){ 
					var call = peer.call(id, window.localStream);
					$scope.streamResources(call);
					console.log("calling to user   -----------");
					$scope.$apply(function(){
						$scope.callResult="connected";
					});
				}, 3000);
				}
			}else if(data.val()=='reject'){
					console.log("reject   -----");
					$scope.deleteData("/calls/"+email);
					db.ref("/userDetails/"+email).update({status:'online'});
					$('#callingModal').modal('hide');
					$('#incomingCallModal').modal('hide');
					$scope.$apply(function(){
						
						$scope.callResult="rejected";
					});
			}else if(data.val() == 'callCut'){
				// this section will  be  unreachable code *child_changed vs child_added event 
				$('#incomingCallModal').modal('hide');
				if($scope.isMeetingStarted==true){
					$scope.deleteData("/calls/"+$scope.email);
				}else{
					$scope.deleteData("/calls/"+$scope.email);
					$scope.updateData("/userDetails/"+$scope.email,{status:'online'});
					$scope.call_cutBtn=false;
				}
			}
		} // end of if callResult
	});

	db.ref("/calls/"+email).on('child_changed', function(data) {
		console.log("child_changed   ------------------------------------------------------"+ data.key +" :- " + data.val());
		if(data.key.toString()=='callResult'){
			if(data.val() == 'callCut'){
				console.log("callCut -----------------------------------------------------------");
				$('#incomingCallModal').modal('hide');
				if($scope.isMeetingStarted ==true){
					$scope.deleteData("/calls/"+$scope.email);
					
					
					
				}else{
					$scope.deleteData("/calls/"+$scope.email);
					$scope.updateData("/userDetails/"+$scope.email,{status:'online'});
					$scope.call_cutBtn=false;
					if(window.existingCall!=undefined)
						window.existingCall.close();
				}
				}
				
		}
	});
	

	
$scope.participantsData={};
var participants=0;
    $scope.streamResources= function(call){
    		window.existingCall=call;
    		
		call.on('stream', function(stream){
			if(participants < 4){
				var userDetailsRef =db.ref("userDetails");
				userDetailsRef.once('value').then(function(userDetailsSnapshot){
		   			userDetailsSnapshot.forEach(function(childUserDetailsSnapshot){
		   				if(childUserDetailsSnapshot.val().uniqueId==call.peer){
		   					$scope.$apply(function(){
		   						$scope.participantsData[call.peer]={existingCall:call,email:childUserDetailsSnapshot.key,aliasName:childUserDetailsSnapshot.val().aliasName,uniqueId:call.peer,imageUrl:childUserDetailsSnapshot.val().imageUrl};
			   					participants++;
		   					});
		   					
		   					console.log(call.peer);
		   					e='  <div class="col-lg-3 col-md-3 col-sm-3">'
			                   +' <div class="panel panel-default">'
			                   +'    <div class="panel-heading"><div class=" text-center">'+childUserDetailsSnapshot.val().aliasName+'</div></div>'
			                   +'        <div class="pannel-content">'  
			                   +'             <video class="img-responsive" autoplay="autoplay" id='+call.peer +' ></video> '  
			                   +'        </div>'  
			                   +'        <div class="panel-footer">'  
			                   +'           <div class=" text-center">'  
			                   +'           <img src="resources/images/reject.png" style="height: 40px; cursor: pointer;" ng-click="removeParticipant('+call.peer +')" >'  
			                   +'           </div>'  
			                   +'          </div>'  
			                   +'         </div>'  
			                   +' </div>';
		   					
		   					
		   					
		   					/*e = '<div class="col-sm-4 col-md-4 col-xs-4 thumbnail"> <h4>'+childUserDetailsSnapshot.val().aliasName+'</h4><div  class="embed-responsive embed-responsive-4by3"> <video class="embed-responsive-item "  id='+call.peer +' autoplay="autoplay"></video></div>'
							+'<center><img src="resources/images/reject.png" style="height: 40px; cursor: pointer;" ng-click="removeParticipant('+call.peer +')" ><center>'
							+'</div>';*/
							$('#box').append($compile(e)($scope)); 
							attachMediaStream( $('#'+call.peer)[0], stream );
							return;
		   				}
		   			});
		   		});
			
				
			}else{
				// todo change it modal
				console.log("to do handle send notification through firebase chatroom is full");
			}
		});
			
			call.on('close', function(){
				console.log(call);
				delete $scope.participantsData[call.peer];
				$('#'+call.peer).parent().parent().parent().remove();  
				participants--;
			});
			call.on('error', function(error){
				delete $scope.participantsData[call.peer];
				$('#'+call.peer).parent().parent().parent().remove();  
				participants--;
				alert("network failure... ");
				console.log(error); 
			});
    }// 
	$scope.removeParticipant= function(peerId){
		console.log("removeParticipants");
		var value= $scope.participantsData[peerId];
		if(value!=undefined){
			value.existingCall.close();
		}
		//$('#'+peerId).parent().remove();
		$('#'+peerId).parent().parent().parent().remove();  
		var userDetailsRef =db.ref("userDetails");
   		userDetailsRef.once('value').then(function(userDetailsSnapshot){
   			userDetailsSnapshot.forEach(function(childUserDetailsSnapshot){
   				if(childUserDetailsSnapshot.val().uniqueId==peerId){
   					$scope.updateData("calls/"+childUserDetailsSnapshot.key,{callResult: 'callCut'});
   					$scope.updateData("calls/"+[email],{callResult: 'callCut'});
   					if($scope.isMeetingStarted==true){
   						$scope.updateData("/userDetails/"+value.email,{status :'online'});
   						if($scope.meetingIdtext==undefined){
   								$scope.updateData("meetings/conferenceJoinRequest/"+$scope.meetingID+"/"+childUserDetailsSnapshot.key,{callResult: 'callCut'});
   						}else{
   								$scope.updateData("meetings/conferenceJoinRequest/"+$scope.meetingIdtext+"/"+childUserDetailsSnapshot.key,{callResult: 'callCut'});
   						}
				}else{
					$scope.updateData("/userDetails/"+$scope.email,{status :'online'});
					
				}
   					participants--;
   				}
   			});
   		});
   		delete $scope.participantsData[peerId];
	}
	
	
	$scope.stopMeeting= function(){
 		if($scope.isMeetingStarted==true){
 	 		participants=0;
 	 		$scope.isMeetingStarted=false;
 	   		$scope.updateData("/userDetails/"+$scope.email,{status :'online'});
 	   		$scope.deleteData("/meetings/_ids/" +$scope.email);
 	   		$scope.deleteData("/meetings/meetingDetails/"+$scope.meetingID);
 	   		$scope.deleteData("/meetings/conferenceJoinRequest/"+$scope.meetingID);
 	   		angular.forEach($scope.participantsData, function(value, index){
 	   			$scope.updateData("/userDetails/"+value.email,{status :'online'});
 	   				if($scope.meetingIdtext==undefined){
						$scope.updateData("meetings/conferenceJoinRequest/"+$scope.meetingID+"/"+value.email,{callResult: 'callCut'});
						$scope.updateData("calls/"+value.email,{callResult: 'callCut'});
 					}else{
						$scope.updateData("meetings/conferenceJoinRequest/"+$scope.meetingIdtext+"/"+value.email,{callResult: 'callCut'});
						$scope.updateData("calls/"+value.email,{callResult: 'callCut'});
					}
 	   				value.existingCall.close();
 	   		});
 	   		$scope.participantsdata={};
 	   		$scope.meetingID=undefined;
 	   		$scope.meetingIdtext=undefined;
 		}else{
 			alert("no meeting is started..");
 		}
 
 	}
	
	$scope.contact={};
	if(email!=undefined){
		firebase.database().ref('contacts/'+email).on('value', function(snapshot){
			$scope.contact={};
			snapshot.forEach(function(childSnapshot){
				firebase.database().ref('userDetails/'+childSnapshot.key).on('value', function(data) {
					if(data.val()!= undefined){
						if ($scope.$root && !$scope.$root.$$phase) {
							$scope.$apply(function(){
									$scope.contact[childSnapshot.key]=data.val();
							});
						}else{
								$scope.contact[childSnapshot.key]=data.val();
						}
					}
					  //console.log($scope.contact);
				});
			});// forEach
		});

	} //end of contacts

// delete Contact
	$scope.deleteContact= function(emailOtherFriend){
		// todo change this alert to  modal
		 var x=	confirm("Are you sure ");
			if(x){
				$scope.deleteData("/contacts/"+$scope.email+"/"+emailOtherFriend);
			}else{
				// do nothing
			}
		}
	 
	// serach Contact
	$scope.filterThis=function(){
		 var mainText=$scope.searchText;
		$(".aliasName").each(function(){
			if($(this).text().toUpperCase().indexOf(mainText.toUpperCase())>-1){
				$(this).parents().eq(4).show();
			}else{
				$(this).parents().eq(4).hide();
			}
			});
		}
	
	$scope.updateUserStatus= function(emailOfUser,status){
		var ref=db.ref("userDetails/"+emailOfUser);
		ref.update({status: status}).then(function(){
			console.log("user status is changed to  "+status );
		}).catch(function(error){
			console.log(error);
		});
	}
	
	$scope.logOutMe= function(){
		firebase.auth().signOut();
		$scope.updateUserStatus(email, 'offline');	
		peer.destroy();
		delete	$scope.$storage.session;
		$state.go('login');
	} // end  off sign out	
	
	// searching user
	
	$scope.searchUsers= function(key){
		$scope.users= {};
		console.log(key+'===========>');
		var databaseRef = firebase.database().ref('/emailIds/').orderByChild('privacy').equalTo('public');
		var contactRef=firebase.database().ref("contacts/"+$scope.email);
		databaseRef.once("value")
		  .then(function(snapshot) {
			  $scope.users= {};
			  snapshot.forEach(function(child) {
					 if(child.val()!= undefined && child.val().uniqueId!=uniqueId){
						 if(child.val().aliasName.toUpperCase().search(key.toUpperCase())!=-1 || child.val().uniqueId.toUpperCase().search(key.toUpperCase())!=-1) {
							//console.log($scope.contact);
							$scope.isExistInContact=false;
							angular.forEach($scope.contact, function(value, key){
								if(value.uniqueId==child.val().uniqueId){
									$scope.isExistInContact=true;
	  							}
							});
							 if(!$scope.isExistInContact){
								 if ($scope.$root && !$scope.$root.$$phase) {
										$scope.$apply(function(){
											$scope.users[child.key]=child.val();
										});
									}else{
										$scope.users[child.key]=child.val();
									}
							 }
						}  
				  }
			  });
			//  console.log($scope.users);
			  $scope.userList=[];
			  angular.forEach($scope.users,function(value,key){
				  $scope.userMap={};
				  $scope.userMap["key"]=key;
				  angular.forEach(value,function(value1,key1){               
					  $scope.userMap[key1]=value1;
				  });
				  $scope.userMap["addUserLink"]="<div> " + $scope.userMap.aliasName +   "&nbsp; &nbsp; "  +  $scope.userMap.uniqueId+ " <br> <img src='" + $scope.userMap.imageUrl + "' width='30px' height='30px'> <br> <button  class ='btn btn-success' ng-click='addUser()'> Add</button></div>";
				  $scope.userList.push($scope.userMap);
			  });
			    //console.log($scope.userList);
		  });
		return $scope.userList;
	}	
	
	$scope.addUser= function(){
		  alert("addUser");
		
	}
	
	// sending friend request 
		$scope.onSelectUser=function(item){
		$scope.success={};
		$scope.item.aliasName='';
		$scope.selectedUser=item;
		//console.log(item.key +"item.key");
		//console.log($scope.email+"$scope.email");
		db.ref("/notifications/"+item.key+"/").once('value').then(function(snapshot){
		 var flag=	snapshot.child($scope.email).exists();
		if(flag){
			$scope.$apply(function(){
				$scope.success.message="Your previous request is pending approval.";
				$scope.success.textColorClass="text-warning";
				$('#successFriendRequestModal').modal('show');
			});
		}else{
		db.ref("/notifications/"+item.key+"/"+$scope.email).set({
			aliasName:$scope.currentUser.aliasName,
			email:$scope.email,
			type:'friendRequest',
			uniqueId:$scope.currentUser.uniqueId
		}) .then(function() {
			$scope.$apply(function(){
				$scope.success.message="Your request to connect has been sent. ";
				$scope.success.textColorClass="text-success";
				$('#successFriendRequestModal').modal('show');   
			});
		  })
		  .catch(function(error) {
				$scope.$apply(function(){
					$scope.success.message="Please try again later";
					$scope.success.textColorClass="text-danger";
					$('#successFriendRequestModal').modal('show');
				});
		  });
		}
		});
	}
	
	
	// start listening firebase notification node for notification ---
	
	$scope.notifications=[];
	$scope.count=0;
	db.ref("/notifications/"+$scope.email).on('child_added', function(snapshot){
		if(snapshot.val().type=='friendRequest'){
			$scope.$apply(function(){
				$scope.count=$scope.count+1;
				$scope.notifications.push({
					email:snapshot.key, aliasName:snapshot.val().aliasName, uniqueId : snapshot.val().uniqueId, type :snapshot.val().type
				});
			});
		}
		if(snapshot.val().type=='friendRequestAccepted'){
			// todo alert user to your friend request has been  accepted 
			$scope.deleteData("/notifications/"+$scope.email+"/"+snapshot.key);
		}
		setTimeout(function(){
			$scope.$apply(function(){
			 $scope.styleColor="#ff5722";
			 $scope.notificationCount=$scope.count;
			 console.log($scope.notificationCount);
			});
		},2000);
		
		setTimeout(function(){
		 	 $scope.$apply(function(){
			 $scope.styleColor="";
			});
		},4000);
	});
	
	
	
	
	$scope.acceptFriendRequest= function(notification,index){
		$scope.notifications.splice(index, 1);
		$scope.count=$scope.count-1;
		$scope.notificationCount=$scope.count;
		var otherEmail= notification.email;
		//friendRequestAccepted
		console.log(notification);
		db.ref("/notifications/"+notification.email+"/"+$scope.email).set({
			aliasName:$scope.currentUser.aliasName,
			email:$scope.email,
			type:'friendRequestAccepted',
			uniqueId:$scope.currentUser.uniqueId
		});
		db.ref("/contacts/"+notification.email).update({ [email] : $scope.currentUser.uniqueId });
		db.ref("/contacts/"+$scope.email).update({ [otherEmail] : notification.uniqueId });
		db.ref("/notifications/"+$scope.email+"/"+notification.email).remove();
	}

	$scope.rejectFriendRequest= function(notification){
		console.log(notification);
	}

	$scope.isOpen=false;
	$scope.closeOpenSideNav= function(){
		if($scope.isOpen==false){
			document.getElementById("mySidenav").style.width = "250px";
			$scope.isOpen=true;
		}else{
			document.getElementById("mySidenav").style.width = "0";
			$scope.isOpen=false;
		}
	}
	
	$scope.closeNav=function(){
		document.getElementById("mySidenav").style.width = "0";
		$scope.isOpen=false;
	}
	
	
	
	
	
}];

