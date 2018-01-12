starter.config(function($stateProvider, $urlRouterProvider) 
{
	var module = "cdc";
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
	.state('app.'+module+'_details/:id/details', {
	url: '/'+module+'/:id/details',
	views: {
	  'menuContent': {
	    templateUrl: 'templates/'+module+'/details.html',
	    controller: module+'DetailsCtrl'
	  }
	}
	})/*
	.state('app.'+module+'_search', {
	url: '/'+module+'/search',
	views: {
	  'menuContent': {
	    templateUrl: 'templates/'+module+'/search.html',
	    controller: module+'SearchCtrl'
	  }
	}
	})
	.state('app.'+module+'_stats', {
	url: '/'+module+'/statistiques',
	views: {
	  'menuContent': {
	    templateUrl: 'templates/'+module+'/statistiques.html',
	    controller: module+'StatsCtrl'
	  }
	}
	})*/
	; 
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/login');
});