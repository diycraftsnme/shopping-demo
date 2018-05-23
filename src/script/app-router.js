(function(){
    angular.module('shoppingDemoProject').config(['$stateProvider','$urlRouterProvider','$locationProvider', function($stateProvider,$urlRouterProvider,$locationProvider){

        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            $state.go('home');
        });
        $urlRouterProvider.when('/home','home');
        $urlRouterProvider.when('/category','category');
        $urlRouterProvider.when('/product','product');
       $locationProvider.html5Mode({enabled:true,requireBase:false}).hashPrefix('!');

        $stateProvider
            .state('home',{
                url:'/home',
                templateUrl:'src/home/home.html',
                controller: 'shoppingDemoController'
            })
            .state('/',{
                url:'/',
                templateUrl:'src/home/home.html',
                controller: 'shoppingDemoController'
            })
            .state('category',{
                url:'/category',
                templateUrl:'src/category/category.html',
                controller: 'shoppingDemoController',
                params: {
                    cid : null
                }
            })
            .state('product',{
                url:'/product',
                templateUrl:'src/product/product.html',
                controller: 'shoppingDemoController',
                params: {
                    pid : null,
                    cid: null
                }
            })

    }]);
})();
