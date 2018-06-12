var myApp = angular.module('myApp', ['ngAnimate']);
var type = "user";
var i = 0;
var currentUser;
var currentTab;
var locV = false;
/*
$(function(){
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		type = $(e.target).text(); 
		if(type=="Users"){
			window.type="user";
		}
		else if(type=="Pages"){
			window.type="page";
		}
		else if(type=="Events"){
			window.type="event";
		}
		else if(type=="Places"){
			window.type="place";
		}
		else if(type=="Groups"){
			window.type="group";
		}
	});
});*/
function loadfav(){
	showF();
    if(localStorage.length==0){
    	document.getElementById("fav").style.display = "none";
    }
	//var table = "<thead id = 'table_head' style = 'font-size:20px;' ><tr><th>#</th><th>Profile photo</th><th>Name</th><th>Type</th><th>Favorite</th><th>Details</th></tr></thead><tbody id='"+"Rtbody"+"'></tbody>";
	//document.getElementById("whole_table").innerHTML = table;
	var tbodyT ="";
	for(var i=0;i<localStorage.length;i++){
		var typeID = localStorage.key(i).split(",");
    	var value = JSON.parse(localStorage.getItem(localStorage.key(i)));
    	tbodyT += "<tr><td>"+(i+1)+"</td><td><img src='"+value.picture.data.url+"' class='img-circle' width='70' height='70'></td><td>"+value.name+"</td><td id=>"+typeID[0]+"s</td><td>";
    	tbodyT += "<button type='button' class='btn' onclick=\"dfav('"+localStorage.key(i)+"')\"><span class='glyphicon glyphicon-trash'></span></button></td>";
    	tbodyT += "<td><button type='button' class='btn' onclick=\"detail('"+localStorage.key(i)+"')\"><span class='glyphicon glyphicon-chevron-right'></span></td></tr>";
    }
    document.getElementById('fbody').innerHTML = tbodyT;
}

function addFavorite(user) {
	var Skey = type + "," + user.id;
	localStorage.setItem(Skey,JSON.stringify(user));
}
function removeFavorite(user){
	var Skey = type + "," + user.id;
	if(type!="Favorites")localStorage.removeItem(Skey);
	else{
		localStorage.removeItem("user," + user.id);
		localStorage.removeItem("page," + user.id);
		localStorage.removeItem("event," + user.id);
		localStorage.removeItem("place," + user.id);
		localStorage.removeItem("group," + user.id);
	}
}
function isFavorite(user) {
	if(user==null)return false;
	if(currentTab != "Favorites"){
		var Skey = type + "," + user.id;
		if (localStorage.getItem(Skey) == null) {
			return false;
		}
		else return true;
	}
	else{
		if (localStorage.getItem("user," + user.id) != null) {
			window.type = "user";
			return true;
		}
		else if (localStorage.getItem("page," + user.id) != null) {
			window.type = "page";
			return true;
		}
		else if (localStorage.getItem("event," + user.id) != null) {
			window.type = "event";
			return true;
		}
		else if (localStorage.getItem("place," + user.id) != null) {
			window.type = "place";
			return true;
		}
		else if (localStorage.getItem("group," + user.id) != null) {
			window.type = "group";
			return true;
		}
		else return false;
	}
}




function load(){
	document.getElementById("loadBar").style.display ="";
	document.getElementById("result").style.display= "none";
	document.getElementById("fav").style.display = "none";
	document.getElementById("det").style.display= "none";
}
function showR(){
	document.getElementById("loadBar").style.display = "none";
	document.getElementById("result").style.display = "";
	document.getElementById("fav").style.display = "none";
	document.getElementById("det").style.display= "none";
}
function showF(){
	document.getElementById("loadBar").style.display = "none";
	document.getElementById("result").style.display = "none";
	document.getElementById("fav").style.display = "";
	document.getElementById("det").style.display= "none";
}
function showD(){
	document.getElementById("loadBar").style.display = "none";
	document.getElementById("result").style.display = "none";
	document.getElementById("fav").style.display = "none";
	document.getElementById("det").style.display= "";
}
function showLoadA(){
	document.getElementById("loadBarD1").style.display = "";
	document.getElementById("albumd").style.display = "none";
}
function hideLoadA(){
	document.getElementById("loadBarD1").style.display = "none";
	document.getElementById("albumd").style.display = "";
}
function showLoadP(){
	document.getElementById("loadBarD2").style.display = "";
	document.getElementById("postd").style.display = "none";
}
function hideLoadP(){
	document.getElementById("loadBarD2").style.display = "none";
	document.getElementById("postd").style.display = "";
}



myApp.controller('myCtrl',function($scope, $http) {
		$scope.detailslide = false;
		$scope.backtof = true;
		$scope.backtor = true;
		if (navigator.geolocation){
			 	navigator.geolocation.getCurrentPosition(function showPosition(position){
			 		$scope.la = position.coords.latitude;
    				$scope.lo = position.coords.longitude;
			 	});
		}
		$scope.myCtrl = function() {
			if(document.getElementById("inputw").value==" "){
				document.getElementById("result").style.display = "none";
				document.getElementById("fav").style.display = "none";
				document.getElementById("det").style.display = "none";
				return;
			}
			if(document.getElementById("inputw").value==""){
				document.getElementById('fav').style.display="none";
				$(document).ready(function(){
					$('[data-toggle="tooltip"]').tooltip();
				});
				$('[data-toggle="tooltip"]').tooltip('show');
				return;
			}
			else {
				$('[data-toggle="tooltip"]').tooltip('destroy');
			}
			load();
			$scope.detailslide = false;
			if(currentTab == "Favorites"){
				window.type="Favorites";
				loadfav();
				window.currentTab = type;
				//$scope.$apply();
				return;
			}
			if($scope.la!= null && $scope.lo!= null && currentTab == "place"){
				$http({
		        method : "GET",
		        url : "fuHW8.php?pkey=" + $scope.key + "&lalo=" + $scope.la+","+$scope.lo
		    }).then(function mySuccess(response) {
		    	if(response.data.data=="") {
		    		document.getElementById("loadBar").style.display = "none";
		    		return;
		    	}
		        $scope.user = response.data.data;
		        $scope.page = response.data.paging;
		        showR();
		        $scope.backtor = true;		    
		        }, function myError(response) {
		        alert(error);
		    	});
			}
			else{
				$http({
			        method : "GET",
			        url : "fuHW8.php?key=" + $scope.key + "&type=" + type
			    }).then(function mySuccess(response) {
			    	if(response.data.data=="") {
			    		document.getElementById("loadBar").style.display = "none";
			    		return;
			    	}
			        $scope.user = response.data.data;
			        $scope.page = response.data.paging;
			        showR();	
			        $scope.backtor = true;	    
			        }, function myError(response) {
			        alert(error);
			    });
			}
		};
		$scope.paging = function(page){
			$http({
		        method : "GET",
		        url : page
		    }).then(function mySuccess(response) {
		        $scope.user = response.data.data;
		        $scope.page = response.data.paging;
		        showR();
		        $scope.backtor = true;	
			    }, function myError(response) {
		        alert(error);
		    });
		};
		$scope.backP = function(){
			$scope.detailslide = false;
			if(currentTab=="Favorites"){
				loadfav();
				showF();
				$scope.backtof = true;
			}
			else{
				showR();
				$scope.backtor = true;
			}
		}
		$scope.fav = function(user){
			//$scope.detailslide = false;
			if (isFavorite(user)) {
				//alert("r");
				$("#"+user.id).css('color','');
				removeFavorite(user);
			} else {
				//alert("a");
				$("#"+user.id).css('color','yellow');
				addFavorite(user);
			}
		};
		$scope.detail = function(user){
			showD();
			showLoadA();
			showLoadP();
			$scope.detailslide = true;
			$scope.backtor = false;
			if(currentTab=="Favorites")$scope.backtof = false;
			window.currentUser = user;
			$scope.cup = user;
			$scope.fuser = user;
			$http({
		        method : "GET",
		        url : "fuHW8.php?id=" + user.id
		    }).then(function mySuccess(response) {
		    	hideLoadA();
		    	hideLoadP();
		    	if(response.data.albums!=null){
		        	$scope.albums = response.data.albums.data;
		    	}
		    	else $scope.albums = null;
		    	if(response.data.posts!=null){
		    		$scope.posts = response.data.posts.data;
		    	}
		    	else $scope.posts = null;
		        //$scope.page = response.data.paging;
		        }, function myError(response) {
		        alert(error);
		    });
		};
		$scope.refresh = function(user){
			return isFavorite(user);
		};
		$scope.loadPic = function(img){
			var URLP = "https://graph.facebook.com/v2.8/";
			URLP += img+"/picture?access_token=EAAZAZCE3xWb8EBAHzrgpmhhx0GZBufNqHNJw8pvEZACRhZBWpUA4cVFX0hSVpEOTVwXpvCrfsKAqwENn8BWUJ0jUgbrMtbl2XxcGHyujJXZA4qzagITyCJj8pGhVmnmyZACjq2ZA1oIZBbmFp6jYWByKjdic4ZCMNDrOgZD";
			return URLP;
		};
		$scope.postFB = function(){
			FB.ui({
				app_id: 1828571527409601,
				method: 'feed',
				link: window.location.href, 
				picture: currentUser.picture.data.url, 
				name: currentUser.name, 
				caption: "FB SEARCH FROM USC CSCI571"
				}, function(response){
				if (response && !response.error_message)
					alert("Posted Successfully");
				else
					alert("No Post");
			});
		};
		$scope.clear = function(){
			document.getElementById("inputw").value = " ";
			angular.element(document.getElementById("b")).scope().myCtrl();
			document.getElementById("inputw").value =  "";
		}
	$('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
		$scope.detailslide=false;
		type = $(e.target).text(); 
		if(type=="Users"){
			window.type="user";
		}
		else if(type=="Pages"){
			window.type="page";
		}
		else if(type=="Events"){
			window.type="event";
		}
		else if(type=="Places"){
			window.type="place";
		}
		else if(type=="Groups"){
			window.type="group";
		}
		else if(type=="Favorites"){
			$scope.backtof = true;
			window.type="Favorites";
			loadfav();
			window.currentTab = type;
			$scope.$apply();
			return;
		}
		window.currentTab = type;
		angular.element(document.getElementById("b")).scope().myCtrl();
		});

	$scope.deFav = function(uid) {
		localStorage.removeItem(uid);
		loadfav();
	};


});

function detail(uid) {
	angular.element(document.getElementById("b")).scope().detail(JSON.parse(localStorage.getItem(uid)));
}

function dfav(uid) {
	angular.element(document.getElementById("b")).scope().deFav(uid);
}









