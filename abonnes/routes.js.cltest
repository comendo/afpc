starter.config(function($stateProvider, $urlRouterProvider) 
{
	var module = "abonnes";
	$stateProvider
	.state('app.'+module+'/:uid/intro', {
	url: '/'+module+'/:uid/intro',
	views: {
	  'menuContent': {
	    templateUrl: 'templates/'+module+'/intro.html',
	    controller: module+'IntroCtrl'
	  }
	}
	})
	.state('app.'+module+'_all', {
	url: '/'+module+'/all',
	views: {
	  'menuContent': {
	    templateUrl: 'templates/'+module+'/all.html',
	    controller: module+'AllCtrl'
	  }
	}
	})
	.state('app.'+module+'_add', {
	url: '/'+module+'/add',
	views: {
	  'menuContent': {
	    templateUrl: 'templates/'+module+'/form.html',
	    controller: module+'AddCtrl'
	  }
	}
	})
	.state('app.'+module+'/:id/update', {
	url: '/'+module+'/:id/update',
	views: {
	  'menuContent': {
	    templateUrl: 'templates/'+module+'/form.html',
	    controller: module+'UpdateCtrl'
	  }
	}
	})
	.state('app.'+module+'_details/:uid/details', {
	url: '/'+module+'/:uid/details',
	views: {
	  'menuContent': {
	    templateUrl: 'templates/'+module+'/details.html',
	    controller: module+'DetailsCtrl'
	  }
	}
	}); 
});