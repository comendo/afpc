var module = "prospects";
starter.controller(module+'AllCtrl', function($scope, $stateParams, $state, NgTableParams, socket, safeApply) {
 console.log("je suis dans le prospectAllCtrl!!");
 
 //declaration variables tableau liste
    var self = this;
	var simpleList = [];
	$scope.simpleList = [];
	
 	var starCountRef = firebase.database().ref(module);
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
      { field: "1", title: "Nom", sortable: "nom", show: true },
      { field: "2", title: "Prenom", sortable: "prenom", show: true },
      { field: "3", title: "Echange", sortable: "echange", show: false },
      { field: "4", title: "Adresse", sortable: "adresse", show: true },      
      { field: "5", title: "Telephone", sortable: "telephone", show: false },
      { field: "6", title: "Fax", sortable: "fax", show: false },
      { field: "7", title: "E-mail", sortable: "e-mail", show: false },
      { field: "8", title: "Responsable", sortable: "responsable", show: false },
      { field: "9", title: "Interlocuteur", sortable: "interlocuteur", show: false },
      { field: "10", title: "Année création", sortable: "annee_crea", show: false },
      { field: "11", title: "Effectif salariés", sortable: "eff_salaries", show: false },
      { field: "12", title: "Activité", sortable: "activite", show: false },
      { field: "13", title: "Adhérent", sortable: "adherent", show: false },
      { field: "14", title: "A jour cotisation", sortable: "a_jour_coti", show: false },
      { field: "15", title: "Financements possibles", sortable: "finance_poss", show: false },
      { field: "16", title: "Le demandeur", sortable: "demandeur", show: false },
      { field: "17", title: "Le client", sortable: "client", show: false },
      { field: "18", title: "Besoins", sortable: "besoins", show: false },
      { field: "19", title: "Quand", sortable: "quand", show: false },
      { field: "20", title: "Quoi", sortable: "quoi", show: false },
      { field: "21", title: "Qui", sortable: "qui", show: false },
      { field: "22", title: "Comment", sortable: "comment", show: false },
      { field: "23", title: "Où", sortable: "ou", show: false },
      { field: "24", title: "Fait où", sortable: "fait_ou", show: false },
      { field: "25", title: "Fait quand", sortable: "fait_quand", show: false },
      { field: "26", title: "Nom consultant", sortable: "nom_consultant", show: false }
      
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
		$state.go('app.'+module+'_details/:id/details',{id:id});
	};
})
.controller(module+'DetailsCtrl', function($scope, $rootScope, $stateParams, NgTableParams, $state) {
	$scope.id = $stateParams.id;
  var i = 0,  
  starCountRef = firebase.database().ref(''+module+'/'+$scope.id);
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
  /*****************************/
    $scope.printDiv = function (div) {
    	console.log("je suis dans printDiv");
  var docHead = document.head.outerHTML;
  var printContents = document.getElementById(div).outerHTML;
  var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no, toolbar=no,dependent=no, width=865, height=600, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";
console.warn("printContents:",printContents);
  var newWin = window.open("", "_blank", winAttr);
  var writeDoc = newWin.document;
  writeDoc.open();
  writeDoc.write('<!doctype html><html>' + docHead + '<body onLoad="window.print()">' + printContents + '</body></html>');
  writeDoc.close();
  newWin.focus();
}
    /*****************************/
  $scope.submitForm = function(prospect)
	{
		//var perso = ref
		console.log("je suis dans prospectUpdateCtrl");
		console.log("prospect:",prospect);
		firebase.database().ref(''+module+'/'+$scope.id).update(prospect, function()
		{
			$rootScope.$apply();
			$scope.$apply();
			$state.go('app.'+module+'_all');
		});
	};
})  
.controller(module+'AddCtrl', function($scope, $rootScope, $stateParams, NgTableParams, $state) {
  $scope.submitForm = function(prospect)
	{
		console.log("je suis dans le submit de prospectAddCtrl");
		console.log("prospect:",prospect);
		//firebase.database().ref(''+module+'/'+prospect.id+'/details').set(prospect, function()
		firebase.database().ref(''+module+'').push().set(prospect, function()
		{
			$rootScope.$apply();
			$scope.$apply();
			$state.go('app.'+module+'_all');
		});
	};
})
.controller(module+'UpdateCtrl', function($scope, $rootScope, $stateParams, NgTableParams, $state) {
	$scope.id = $stateParams.id;
  var i = 0,  
  starCountRef = firebase.database().ref(module+'/'+$scope.id);
  console.warn("je suis dans prospectUpdateCtrl");
  console.log("$scope.id:",$scope.id);
  console.log("starCountRef:",starCountRef);
  starCountRef.on("value", function(snapshot,prevChildKey) { 
     	console.warn("snapshot.key:",snapshot.key);
		//$scope.$apply(function() {
			console.log("snapshot.val() SSSSEEEEBBBB:",snapshot.val());
			$scope.prospect = snapshot.val();
			console.log("$scope.prospect:",$scope.prospect);
		//}); *
		//snapshot.forEach(function(data) {
	 }); 
  
  $scope.submitForm = function(prospect)
	{
		//var perso = ref
		console.log("je suis dans prospectUpdateCtrl");
		console.log("prospect:",prospect);
		gapi.client.sheets.spreadsheets.values.update({
                    spreadsheetId: '1mFNoxXKCosBGkhWcOOaYTuQ4ud2PmtRgsqnCRMRHsTg',
                    range: 'test!B'+$scope.id,
                    valueInputOption: 'USER_ENTERED',
                    values: [ prospect ]
                }).then(function(err, response) {
                	if(err)console.warn("voici l'erreur:",err);
                    console.log(response);
                    console.warn("alors,ça dit quoi?:",response);
                });
		firebase.database().ref(''+module+'/'+$scope.id).update(prospect, function()
		{
			$rootScope.$apply();
			$scope.$apply();
			$state.go('app.'+module+'_all');
		});
	};
});