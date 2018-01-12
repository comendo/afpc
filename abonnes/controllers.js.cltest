var abonnes = "abonnes";
starter.controller(abonnes+'AllCtrl', function($scope, $stateParams, $state, NgTableParams, socket, safeApply) {
 console.log("je suis dans le prospectAllCtrl!!");
 
 //declaration variables tableau liste
    var self = this;
	var simpleList = [];
	$scope.simpleList = [];
	
 	var starCountRef = firebase.database().ref(abonnes);
	console.log("starCountRef:",starCountRef);

	starCountRef.on("value", function(snapshot){
     	var i = 0;
     		snapshot.forEach(function(childSnapshot) {
     			safeApply($scope, function() {
     			//console.warn("childSnapshot.key:",childSnapshot.key);
     			if(childSnapshot.key != 0)
     			{
     				$scope.simpleList[i] = childSnapshot.val();
	     			$scope.simpleList[i].id = childSnapshot.key;
	     			i++;					
				}
	     			
   				//});
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
	 }); 
	 //donnees tableau
	self.move = move; 
	self.cols = [
      { field: "0", title: "Nom", sortable: "nom", show: true },
      { field: "1", title: "Prenom", sortable: "prenom", show: true },
      { field: "2", title: "Association", sortable: "association", show: true },
      { field: "3", title: "Num", sortable: "num", show: true }
      
      /*,
      { field: "num_prospect", title: "N° Utilisateur", sortable: "num_prospect", show: false }*/
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
		$state.go('app.'+abonnes+'/:id/update',{id:id});
	};
})
.controller(abonnes+'DetailsCtrl', function($scope, $rootScope, $stateParams, NgTableParams, $state) {
	$scope.id = $stateParams.id;
  var i = 0,  
  starCountRef = firebase.database().ref(''+abonnes+'/'+$scope.id);
  console.warn("je suis dans le submit de prospectUpdateCtrl");
  //console.log("id:",id);
  console.log("starCountRef:",starCountRef);
  starCountRef.on("value", function(snapshot) { 
     	
		//$scope.$apply(function() {
			console.log("snapshot.val() SSSSEEEEBBBB:",snapshot.val());
			$scope.prospect = snapshot.val();
			console.log("$scope.prospect:",$scope.prospect);
		//}); 
	 }); 
  
  $scope.submitForm = function(prospect)
	{
		//var perso = ref
		console.log("je suis dans prospectUpdateCtrl");
		console.log("prospect:",prospect);
		firebase.database().ref(''+abonnes+'/'+$scope.id).update(prospect, function()
		{
			$rootScope.$apply();
			$scope.$apply();
			$state.go('app.'+abonnes+'_all');
		});
	};
})  
.controller(abonnes+'AddCtrl', function($scope, $rootScope, $stateParams, NgTableParams, $state) {
  $scope.submitForm = function(abonne)
	{
		console.log("je suis dans le submit de abonneAddCtrl");
		console.log("abonne:",abonne);
		//firebase.database().ref(''+abonnes+'/'+abonne.id+'/details').set(abonne, function()
		firebase.database().ref(''+abonnes+'').push().set(abonne, function()
		{
			$rootScope.$apply();
			$scope.$apply();
			$state.go('app.'+abonnes+'_all');
		});
	};
})
.controller(abonnes+'UpdateCtrl', function($scope, $rootScope, $stateParams, NgTableParams, $state) {
	$scope.id = $stateParams.id;
  var i = 0,  
  starCountRef = firebase.database().ref(abonnes+'/'+$scope.id);
  console.warn("je suis dans abonneUpdateCtrl");
  console.log("$scope.id:",$scope.id);
  console.log("starCountRef:",starCountRef);
  starCountRef.on("value", function(snapshot,prevChildKey) { 
     	console.warn("snapshot.key:",snapshot.key);
		//$scope.$apply(function() {
			console.log("snapshot.val() SSSSEEEEBBBB:",snapshot.val());
			$scope.abonne = snapshot.val();
			console.log("$scope.abonne:",$scope.abonne);
		//}); *
		//snapshot.forEach(function(data) {
	 }); 
  
  $scope.submitForm = function(abonne)
	{
		//var perso = ref
		console.log("je suis dans abonneUpdateCtrl");
		console.log("abonne:",abonne);
		gapi.client.sheets.spreadsheets.values.update({
                    spreadsheetId: '1mFNoxXKCosBGkhWcOOaYTuQ4ud2PmtRgsqnCRMRHsTg',
                    range: 'test!B'+$scope.id,
                    valueInputOption: 'USER_ENTERED',
                    values: [ abonne ]
                }).then(function(err, response) {
                	if(err)console.warn("voici l'erreur:",err);
                    console.log(response);
                    console.warn("alors,ça dit quoi?:",response);
                });
		firebase.database().ref(''+abonnes+'/'+$scope.id).update(abonne, function()
		{
			$rootScope.$apply();
			$scope.$apply();
			$state.go('app.'+abonnes+'_all');
		});
	};
})
;