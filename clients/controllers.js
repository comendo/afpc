starter.controller('usersAddCtrl', function($scope, $rootScope, $stateParams, NgTableParams, $state) {
  $scope.submitForm = function(user)
	{
		console.log("je suis dans le submit de userAddCtrl");
		console.log("user:",user);
		//firebase.database().ref('users/'+user.id+'/details').set(user, function()
		firebase.database().ref('users').push().set(user, function()
		{
			$rootScope.$apply();
			$scope.$apply();
			$state.go('app.users_all');
		});
	};
})
.controller('usersUpdateCtrl', function($scope, $rootScope, $stateParams, NgTableParams, $state) {
	$scope.id = $stateParams.id;
  var i = 0,  
  starCountRef = firebase.database().ref('users/'+$scope.id);
  console.warn("je suis dans le submit de userUpdateCtrl");
  //console.log("id:",id);
  console.log("starCountRef:",starCountRef);
  starCountRef.on("value", function(snapshot,prevChildKey) { 
     	console.warn("snapshot.key:",prevChildKey);
		//$scope.$apply(function() {
			console.log("snapshot.val() SSSSEEEEBBBB:",snapshot.val());
			$scope.user = snapshot.val();
			console.log("$scope.user:",$scope.user);
		//}); *
		//snapshot.forEach(function(data) {
	 }); 
  
  $scope.submitForm = function(user)
	{
		//var perso = ref
		console.log("je suis dans userUpdateCtrl");
		console.log("user:",user);
		firebase.database().ref('users/'+$scope.id).update(user, function()
		{
			$rootScope.$apply();
			$scope.$apply();
			$state.go('app.users_all');
		});
	};
})
.controller('usersDetailsCtrl', function($scope, $rootScope, $stateParams, NgTableParams, $state) {
	$scope.id = $stateParams.id;
  var i = 0,  
  starCountRef = firebase.database().ref('users/'+$scope.id);
  console.warn("je suis dans le submit de userUpdateCtrl");
  //console.log("id:",id);
  console.log("starCountRef:",starCountRef);
  starCountRef.on("value", function(snapshot) { 
     	
		//$scope.$apply(function() {
			console.log("snapshot.val() SSSSEEEEBBBB:",snapshot.val());
			$scope.user = snapshot.val();
			console.log("$scope.user:",$scope.user);
		//}); 
	 }); 
  
  $scope.submitForm = function(user)
	{
		//var perso = ref
		console.log("je suis dans userUpdateCtrl");
		console.log("user:",user);
		firebase.database().ref('users/'+$scope.id).update(user, function()
		{
			$rootScope.$apply();
			$scope.$apply();
			$state.go('app.users_all');
		});
	};
})
//controleur qui gère  
.controller('usersAllCtrl', function($scope, $stateParams, $state, NgTableParams, socket) {
 console.log("j'y suis!!");
 socket.emit('test', 'ok');
 
 
 socket.on("test", function(data) 
    {
    	console.log("je retourne dans data:");
	    console.log(data);
	    $scope.poste = data;
	});
 //declaration variables tableau liste
    var self = this;
	var simpleList = [];
	$scope.simpleList = [];
	
 	var starCountRef = firebase.database().ref('users');
	console.log("starCountRef:",starCountRef);

	starCountRef.on("value", function(snapshot){
     	var i = 0;
     		snapshot.forEach(function(childSnapshot) {
     			//console.warn("childSnapshot.key:",childSnapshot.key);
     			$scope.simpleList[i] = childSnapshot.val();
     			$scope.simpleList[i].id = childSnapshot.key;
     			i++;
   
     		console.log("snapshot.val():",snapshot.val());
     		console.log("simpleList:",$scope.simpleList);
     		self.tableParams = new NgTableParams(
		    {
	            page: 1,            // show first page
	            total: $scope.simpleList.length, // length of data
	            count: 10,          // count per page
	            sorting: { nom: "desc" } 
		    },
		    {
		      dataset: $scope.simpleList
		    }); 
		});
	 }); 
		
starCountRef.on("child_changed", function(snapshot) { 
     	var i = 0;
     		snapshot.forEach(function(childSnapshot) {
     			
     			$scope.simpleList[i] = childSnapshot.val().details;
     			i++;
   
     		console.log("snapshot.val():",snapshot.val());
     		console.log("simpleList:",$scope.simpleList);
     		self.tableParams = new NgTableParams(
		    {
	            page: 1,            // show first page
	            total: $scope.simpleList.length, // length of data
	            count: 10,          // count per page
	            sorting: { nom: "desc" } 
		    },
		    {
		      dataset: $scope.simpleList
		    }); 
		});
	 }); 

	 //donnees tableau
	self.move = move; 
	self.cols = [
      { field: "nom", title: "Nom", sortable: "nom", show: true },
      { field: "prenom", title: "Prenom", sortable: "prenom", show: true },
      { field: "ecole", title: "Ecole", sortable: "ecole", show: false },
      { field: "classe", title: "Classe", sortable: "classe", show: true },      
      { field: "age", title: "Age", sortable: "age", show: false }/*,
      { field: "num_user", title: "N° Utilisateur", sortable: "num_user", show: false }*/
    ];
    
    function move(column, currentIdx, value)
    {
      	var newPosition = currentIdx + value;
      	if (newPosition >= self.cols.length || newPosition < 0)  return;
      	self.cols[currentIdx] = self.cols[newPosition];
      	self.cols[newPosition] = column;
    }; 

    $scope.details = function(id)
    {
    	console.warn("ok, on vient de cliquer sur une LIGNE!!");
		console.log("id:",id);
		$state.go('app.users/:id/update',{id:id});
	};
});