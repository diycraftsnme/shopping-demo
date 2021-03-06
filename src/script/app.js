function toggleMiniCart() {
    if($('.mini-cart .row').length>0)
        $('.mini-cart').toggleClass('show');
}
var searchOverlayMobile;

$(document).ready(function () {

    $(document).on("mouseenter",".image",function() {
        $(this).siblings('.prod-details').find('.product-description,.product-name .original-price').toggle('slow');
        $(this).siblings('.prod-details').find('.product-name').animate({
            'padding-top' : 0
        }, "slow");
    });
    $(document).on("mouseleave",".image",function() {
        $(this).siblings('.prod-details').find('.product-description,.product-name .original-price').toggle();
        $(this).siblings('.prod-details').find('.product-name').animate({
            'padding-top' : 10
        }, "slow");
    });
});

(function(){
    "use strict";
    angular.module('shoppingDemoProject',['ngAnimate','ui.router','rzModule']).controller('shoppingDemoController',['$scope','$rootScope','$timeout','$state',function($scope,$rootScope,$timeout,$state){
        var dpc = this;

        dpc.currentProdId = '';
        $scope.largeGridCount = 4;
        $scope.mediumGridCount = 3;
        $scope.noLikeOnProduct = true;
        $scope.currentCategoryName = '';
        $scope.currentCategoryImage = '';
        $scope.categoryProducts = [];
        $scope.currentProductName = '';
        $scope.productDetails = {};
        $scope.showSearchOverlay = false;
        $scope.activeClass = '';
        $scope.slider = {
            minValue: 100,
            maxValue: 4000,
            options: {
                floor: 100,
                ceil: 4000,
                translate: function(value, sliderId, label) {
                    switch (label) {
                        case 'model':
                            return '<b>Min price:</b> INR' + value;
                        case 'high':
                            return '<b>Max price:</b> INR' + value;
                        default:
                            return 'INR' + value
                    }
                }
            }
        };

        $scope.toggleLikeProduct = function () {
            $scope.noLikeOnProduct = !$scope.noLikeOnProduct;
        };
        $scope.SaveState= function (prodData) {
            sessionStorage.cartDetails = angular.toJson(prodData);
        };

        $scope.toggleSearchSection = function () {
            $scope.showSearchOverlay = !$scope.showSearchOverlay;
            angular.element('.input-area').toggleClass('expand');
            angular.element('.input-area input').focus();
            angular.element('.header-module').toggleClass('sticky');
            angular.element('.search-section').toggle('slow');
        };

        $scope.toggleMobileSearchSection = function () {
            if(typeof searchOverlayMobile == 'undefined')
                searchOverlayMobile = new Foundation.Reveal(angular.element('#searchOverlay'));
            angular.element('#searchOverlay').foundation('toggle');
        };

        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            if (scroll >= 200) {
                $("body").addClass("sticky-header");
            } else{
                $("body").removeClass("sticky-header");
            }
        });

        $scope.RestoreState= function () {
            return angular.fromJson(sessionStorage.cartDetails);
        };
        $scope.cartDetails = $scope.RestoreState() || [];
        angular.element('.cart-count').text($scope.cartDetails.length);
            $scope.productArray = {
            "Sofa":[
                {"id":"sofa_001","image":"src/Images/Sofa-new-1.jpg","name":"Sofa Deluxe","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"2500.00","offerprice":"2000.00","promotion":"Get INR500 OFF"},
                {"id":"sofa_002","image":"src/Images/Sofa-new-2.jpg","name":"Sofa Modern","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"3500.00","offerprice":"3500.00","promotion":""}
            ],
            "Chair":[
                {"id":"chair_001","image":"src/Images/chair-new-1.jpg","name":"Chair Deluxe","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"700.00","offerprice":"600.00","promotion":"Get INR100 OFF"},
                {"id":"chair_002","image":"src/Images/Chair-new-2.jpg","name":"Chair Comfort","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"1500.00","offerprice":"1500.00","promotion":""},
                {"id":"chair_003","image":"src/Images/chair-new-3.jpg","name":"Express Chair","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"550.00","offerprice":"450.00","promotion":"Get INR100 OFF"},
                {"id":"chair_004","image":"src/Images/Chair-new-4.jpg","name":"Comfort Chair","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"550.00","offerprice":"450.00","promotion":"Get INR100 OFF"},
                {"id":"chair_005","image":"src/Images/Chair-new-5.jpg","name":"Extreme comfort Chair","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"550.00","offerprice":"450.00","promotion":"Get INR100 OFF"}

            ],
            "Table":[{"id":"table_004","image":"src/Images/table-new-1.jpg","name":"Kitchen Table","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"1050.00","offerprice":"950.00","promotion":"Get INR100 OFF"},
                {"id":"table_001","image":"src/Images/table-new-2.jpg","name":"Luxury Table","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"1050.00","offerprice":"950.00","promotion":"Get INR100 OFF"},
                {"id":"table_002","image":"src/Images/table-new-3.jpg","name":"Deluxe Table","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"1050.00","offerprice":"950.00","promotion":"Get INR100 OFF"},
                {"id":"table_003","image":"src/Images/table-new-4.jpg","name":"Express Table","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"1050.00","offerprice":"950.00","promotion":"Get INR100 OFF"}
            ]
        };
        
        $scope.showCategory = function (categoryName) {
            $state.go('category',{cid:categoryName});
        };


        $scope.openQuickView = function (id) {
            var elem_id = new Foundation.Reveal(angular.element('#quickView_Modal_'+id));
            dpc.currentProdId = id;
            angular.element('#quickView_Modal_'+id).foundation('open');
        };

        $scope.showShareModal = function () {
            var elem = new Foundation.Reveal(angular.element('#shareModal'));
            angular.element('#shareModal').foundation('open');
        };

        $scope.addToCart = function (pid) {
            angular.forEach($scope.productArray,function (value,index) {
                for(var i=0;i<value.length;i++){
                    if(value[i].id === pid){
                        $scope.cartDetails.push(value[i]);
                        $scope.SaveState($scope.cartDetails);
                        angular.element('.cart-count').text($scope.cartDetails.length);
                        angular.element('#quickView_Modal_'+pid).foundation('close');
                        angular.element('#quickView_Modal_'+pid).foundation('_destroy');
                        angular.element('.mini-cart').addClass('show').stop().delay(1000).queue(function(){
                            angular.element(this).removeClass('show');
                        });
                    }
                }
            });
        };

        $scope.removeProduct = function (pid) {
            for(var i=0;i<$scope.cartDetails.length;i++){
                if($scope.cartDetails[i].id === pid){
                    $scope.cartDetails.splice(i, 1);
                    $scope.SaveState($scope.cartDetails);
                    angular.element('.cart-count').text($scope.cartDetails.length);
                }
            }
            if(angular.element('.mini-cart .row').length==0){
                toggleMiniCart();
            }
        };

        //var topNav = new Foundation.DropdownMenu(angular.element('.dropdown'));

        //var stickyHeader = new Foundation.Sticky(angular.element('.header-module'));

        var accordionFilter = new Foundation.Accordion(angular.element('.accordion'));


        if($state.current.name == 'home' || $state.current.name == '/'){
            //var elem = new Foundation.Orbit(angular.element('.orbit'));
            angular.element('body').addClass('homepage').removeClass('categorypage productpage sofacategory  chaircategory tablecategory');
            $scope.productArray = {
                "Sofa":[
                    {"id":"sofa_001","image":"src/Images/Sofa-new-1.jpg","name":"Sofa Deluxe","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"2500.00","offerprice":"2000.00","promotion":"Get INR500 OFF"},
                    {"id":"sofa_002","image":"src/Images/Sofa-new-2.jpg","name":"Sofa Modern","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"3500.00","offerprice":"3500.00","promotion":""}
                ],
                "Chair":[
                    {"id":"chair_001","image":"src/Images/chair-new-1.jpg","name":"Chair Deluxe","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"700.00","offerprice":"600.00","promotion":"Get INR100 OFF"},
                    {"id":"chair_002","image":"src/Images/Chair-new-2.jpg","name":"Chair Comfort","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"1500.00","offerprice":"1500.00","promotion":""},
                    {"id":"chair_003","image":"src/Images/chair-new-3.jpg","name":"Express Chair","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"550.00","offerprice":"450.00","promotion":"Get INR100 OFF"},
                    {"id":"chair_004","image":"src/Images/Chair-new-4.jpg","name":"Comfort Chair","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"550.00","offerprice":"450.00","promotion":"Get INR100 OFF"},
                    {"id":"chair_005","image":"src/Images/Chair-new-5.jpg","name":"Extreme comfort Chair","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"550.00","offerprice":"450.00","promotion":"Get INR100 OFF"}

                ],
                "Table":[{"id":"table_004","image":"src/Images/table-new-1.jpg","name":"Kitchen Table","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"1050.00","offerprice":"950.00","promotion":"Get INR100 OFF"},
                    {"id":"table_001","image":"src/Images/table-new-2.jpg","name":"Luxury Table","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"1050.00","offerprice":"950.00","promotion":"Get INR100 OFF"},
                    {"id":"table_002","image":"src/Images/table-new-3.jpg","name":"Deluxe Table","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"1050.00","offerprice":"950.00","promotion":"Get INR100 OFF"},
                    {"id":"table_003","image":"src/Images/table-new-4.jpg","name":"Express Table","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"1050.00","offerprice":"950.00","promotion":"Get INR100 OFF"}
                ]
            };
        } else if($state.current.name == 'category'){
            $scope.largeGridCount = 3;
            $scope.mediumGridCount = 2;
            $state.categoryName = $state.params.cid;
            angular.element('body').addClass('categorypage').removeClass('homepage productpage');
            if($state.categoryName === 'sofas'){
                angular.element('body').addClass('sofacategory').removeClass('chaircategory tablecategory');
                $scope.categoryProducts = $scope.productArray.Sofa;
                $scope.currentCategoryName = 'Sofas';
                $scope.currentCategoryImage = 'src/Images/sofa4.jpg';
                $scope.productArray = {
                    "Sofa":[
                        {"id":"sofa_001","image":"src/Images/Sofa-new-1.jpg","name":"Sofa Deluxe","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"2500.00","offerprice":"2000.00","promotion":"Get INR500 OFF"},
                        {"id":"sofa_002","image":"src/Images/Sofa-new-2.jpg","name":"Sofa Modern","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"3500.00","offerprice":"3500.00","promotion":""}
                    ]};
            } else if($state.categoryName === 'chairs'){
                angular.element('body').addClass('chaircategory').removeClass('sofacategory  tablecategory');
                $scope.categoryProducts = $scope.productArray.Chair;
                $scope.currentCategoryName = 'Chairs';
                $scope.currentCategoryImage = 'src/Images/chair4.jpg';
                $scope.productArray = {"Chair":[
                    {"id":"chair_001","image":"src/Images/chair-new-1.jpg","name":"Chair Deluxe","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"700.00","offerprice":"600.00","promotion":"Get INR100 OFF"},
                    {"id":"chair_002","image":"src/Images/Chair-new-2.jpg","name":"Chair Comfort","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"1500.00","offerprice":"1500.00","promotion":""},
                    {"id":"chair_003","image":"src/Images/chair-new-3.jpg","name":"Express Chair","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"550.00","offerprice":"450.00","promotion":"Get INR100 OFF"},
                    {"id":"chair_004","image":"src/Images/Chair-new-4.jpg","name":"Comfort Chair","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"550.00","offerprice":"450.00","promotion":"Get INR100 OFF"},
                    {"id":"chair_005","image":"src/Images/Chair-new-5.jpg","name":"Extreme comfort Chair","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"550.00","offerprice":"450.00","promotion":"Get INR100 OFF"}

                ]};
            } else{
                angular.element('body').addClass('tablecategory').removeClass('sofacategory chaircategory');
                $scope.categoryProducts = $scope.productArray.Table;
                $scope.currentCategoryName = 'Tables';
                $scope.currentCategoryImage = 'src/Images/table2.jpg';
                $scope.productArray = {
                    "Table":[{"id":"table_004","image":"src/Images/table-new-1.jpg","name":"Kitchen Table","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"1050.00","offerprice":"950.00","promotion":"Get INR100 OFF"},
                        {"id":"table_001","image":"src/Images/table-new-2.jpg","name":"Luxury Table","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"1050.00","offerprice":"950.00","promotion":"Get INR100 OFF"},
                        {"id":"table_002","image":"src/Images/table-new-3.jpg","name":"Deluxe Table","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"1050.00","offerprice":"950.00","promotion":"Get INR100 OFF"},
                        {"id":"table_003","image":"src/Images/table-new-4.jpg","name":"Express Table","description":"Elegant and compact design. Easy-to-clean faux leather covering.","originalprice":"1050.00","offerprice":"950.00","promotion":"Get INR100 OFF"}
                    ]
                };
            }
        } else if($state.current.name == 'product'){
            angular.element('body').addClass('productpage').removeClass('homepage categorypage sofacategory  chaircategory tablecategory');
            var pid = $state.params.pid;
                $state.categoryName = $state.params.cid.toLowerCase();

            if($state.categoryName === 'sofas'){
                $scope.categoryProducts = $scope.productArray.Sofa;
                for(var i=0;i<$scope.categoryProducts.length;i++){
                    if($scope.categoryProducts[i].id === pid){
                        $scope.productDetails = $scope.categoryProducts[i];
                    }
                }
                $scope.currentCategoryName = 'sofas';
            } else if($state.categoryName === 'chairs'){
                $scope.categoryProducts = $scope.productArray.Chair;
                for(var i=0;i<$scope.categoryProducts.length;i++){
                    if($scope.categoryProducts[i].id === pid){
                        $scope.productDetails = $scope.categoryProducts[i];
                    }
                }
                $scope.currentCategoryName = 'chairs';
            } else{
                $scope.categoryProducts = $scope.productArray.Table;
                for(var i=0;i<$scope.categoryProducts.length;i++){
                    if($scope.categoryProducts[i].id === pid){
                        $scope.productDetails = $scope.categoryProducts[i];
                    }
                }
                $scope.currentCategoryName = 'tables';
            }
        }

    }]);
})();