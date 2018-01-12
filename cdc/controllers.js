var module = "cdc";
starter.controller(module+'AllCtrl', function($scope, $rootScope, $stateParams, $state, NgTableParams, socket, safeApply) {//permet d'afficher tous les cahiers des charges
	//declaration des variables
 	$rootScope.module = "cahiers des charges";
 	$scope.simpleList = [];
 	var self = this,
    titre = [],
    starCountRef = firebase.database().ref(module);//retourne la base de données
	//permet une ecoute de la base de donnees et instancie une variable avec les valeurs retournees
	starCountRef.on("value", function(snapshot){
     	var i = 0;
     	snapshot.forEach(function(childSnapshot) {
     		console.warn("de retour");
	     	safeApply($scope, function() {
	     		if(childSnapshot.key != 0)//si les donnees ne correspondent pas aux noms des colonnes du tableau
	 			{
	 				console.warn("dans le childSnapshot");
	 				$scope.simpleList[i] = childSnapshot.val();
	     			$scope.simpleList[i].id = childSnapshot.key;
	     			i++;					
				}
				else
				{
					titre = childSnapshot.val();
					//alert(titre.length);
					var test = [];
					for(var j = 0; j < titre.length;j++)
					{
						if(j<6)test[j] = { field: j, title: titre[j], sortable: titre[j], show: true };
						else test[j] = { field: j, title: titre[j], sortable: titre[j], show: false };
					}
						self.cols = test;    
				}
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
    function move(column, currentIdx, value)
    {
      	var newPosition = currentIdx + value;
      	if (newPosition >= self.cols.length || newPosition < 0)  return;
      	self.cols[currentIdx] = self.cols[newPosition];
      	self.cols[newPosition] = column;
    }; 
	//redirige sur la feuille du details de la donnee selectionnee 
    $scope.details = function(id)
    {
    	$state.go('app.'+module+'_details/:id/details',{id:id});
	};
	//imprime la page
    $scope.cndPrint = function (div) {
    	console.log("je suis dans cndPrint");
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
    
})
.controller(module+'DetailsCtrl', function($scope, $rootScope, $stateParams, $state) { //permet d'afficher tous les details d'un cahier des charges
	//declaration des variables
 	$rootScope.module = "cahiers des charges";
	$scope.id = $stateParams.id;//l'id qui se trouve dans l'url et qui correspond a la donnee selectionnee
	$scope.data = [];
  	var i = 0,  
  	starCountRef = firebase.database().ref(''+module+'/'+$scope.id);//retourne les donnees correspondantes à l'id
  	
	starCountRef.on("value", function(snapshot){ //instancie $scope.data avec toutes les donnes de l'id
		$scope.data = snapshot.val();  
	}); 
  	//imprime la page
    $scope.cndPrint = function (div) {
    	console.log("je suis dans cndPrint");
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
    //permet d'effacer le cahier des charges selectionne
  	$scope.cndDelete = function()
  	{
  		firebase.database().ref(''+module+'/'+$scope.id).remove(function()
		{
			$rootScope.$apply();
			$scope.$apply();
			setTimeout(function()
			{
				console.warn("je suis passé dans le delete, pour supprimer:"+$scope.id);
				$state.go('app.'+module+'_all');
			},3000);
		});	
  	};
})  
.controller(module+'AddCtrl', function($scope, $rootScope, $stateParams, NgTableParams, $state, socket, safeApply) {//permet de creer un nouveau cahier des charges
	//declaration des variables
	var starCountRef = firebase.database().ref(module);
	$scope.label = [];
	
	//ecoute sur le champ "0" pour instancier une variable, pour le contenu du formulaire
	starCountRef.on("value", function(snapshot){
     	snapshot.forEach(function(childSnapshot) {
 			safeApply($scope, function() {
	 			if(childSnapshot.key == 0)
	 			{
	 				$scope.label = childSnapshot.val();						     		
				}
			});
		});
	});
	//permet d'initialiser la variable $scope.cdc
	$scope.hydrate = function(cdc)
  	{
		$scope.cdc = cdc;
	};
	//met a jour la base de donnees avec les nouvelles valeurs de donnees
  	$scope.submitForm = function(data)
	{
		console.log("je suis dans le submit de cdcAddCtrl");
		console.log("cdc:",data);
		firebase.database().ref(''+module+'').push().set(data, function()
		{
			$rootScope.$apply();
			$scope.$apply();
			$state.go('app.'+module+'_all');
		});
	};
})
.controller(module+'UpdateCtrl', function($scope, $rootScope, $stateParams, NgTableParams, $state, safeApply) {//permet de modifier un cahier des charges
	//déclaration des variables
	$scope.id = $stateParams.id;
	$scope.label = [];
  	var i = 0,  
  	starCountRef = firebase.database().ref(module);
  	//permet une ecoute de la base de donnees et instancie une variable avec les valeurs retournees
  	starCountRef.on("value", function(snapshot) { 
     	console.warn("snapshot.key:",snapshot.key);
		console.log("snapshot.val() SSSSEEEEBBBB:",snapshot.val());
		$scope.cdc = snapshot.val();
		console.log("$scope.cdc:",$scope.cdc);
		snapshot.forEach(function(childSnapshot) {
 			safeApply($scope, function() {
	 			if(childSnapshot.key == 0)
	 			{
	 				$scope.label = childSnapshot.val();						     		
				}
				else if(childSnapshot.key == $scope.id)
				{
					$scope.cdc = childSnapshot.val();						     		
				}
			});
		});
	 }); 
	 
  	//met a jour la base de donnees avec les nouvelles valeurs de donnees
  	$scope.submitForm = function(cdc)
	{
		firebase.database().ref(''+module+'/'+$scope.id).update(cdc, function()
		{
			$rootScope.$apply();
			$scope.$apply();
			$state.go('app.'+module+'_all');
		});
	};
});

/*
$scope.submitForm = function(cdc)
	{
		console.log("je suis dans cdcUpdateCtrl");
		console.log("cdc:",cdc);
		gapi.client.sheets.spreadsheets.values.update({
                    spreadsheetId: '1mFNoxXKCosBGkhWcOOaYTuQ4ud2PmtRgsqnCRMRHsTg',
                    range: 'titre!B'+$scope.id,
                    valueInputOption: 'USER_ENTERED',
                    values: [ cdc ]
                i}).then(function(err, response) {
                	if(err)console.warn("voici l'erreur:",err);
                    console.log(response);
                    console.warn("alors,ça dit quoi?:",response);
                });
		firebase.database().ref(''+module+'/'+$scope.id).update(cdc, function()
		{
			$rootScope.$apply();
			$scope.$apply();
			$state.go('app.'+module+'_all');
		});
	};
*/