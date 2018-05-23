(function(){
    angular.module('shoppingDemoProject',['ui.router']).config(['$stateProvider','$urlRouterProvider','localStorageServiceProvider','KeepaliveProvider', 'IdleProvider','$locationProvider', function($stateProvider,$urlRouterProvider,localStorageServiceProvider,KeepaliveProvider, IdleProvider,$locationProvider){
        /*localStorageServiceProvider
         .setPrefix('WorkManagement')
         .setStorageCookieDomain('')
         .setStorageType('sessionStorage')
         .setNotify(true, true);
         */

        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            $state.go('/');
        });
        $urlRouterProvider.when('/home','home');
        //$urlRouterProvider.when('/create','create');
        $locationProvider.html5Mode({enabled:true,requireBase:false}).hashPrefix('!');

        $stateProvider
            .state('home',{
                url:'/',
                templateUrl:'src/home/home.html',
                controller:'shoppingDemoController',
                controllerAs:'shoppingDemoCtrl'
            })
            .state('/',{
                url:'/',
                templateUrl:'src/home/home.html',
                controller:'shoppingDemoController',
                controllerAs:'shoppingDemoCtrl'
            })
    }]);
})();
