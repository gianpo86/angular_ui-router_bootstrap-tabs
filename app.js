/**
 * Created by klavs1us on 22/09/15.
 */
'use strict';

var app = angular.module('uiTabs', ['ui.bootstrap', 'ui.router']);

/*Main controller for side menu*/
app.controller('MenuCtrl', ['$scope', '$stateParams', '$state',
    function($scope) {
        $scope.menu = [
            {state: 'tabs.first', name: 'Example Tabs'},
            {state: 'content', name: 'Example Content'}
        ];
    }
]);
/*End main controller for side menu*/

/*UI-ROUTER*/
app.config(function($stateProvider,$locationProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    /*START TABS*/
    /*START TABS MENU*/
    $stateProvider
        .state('tabs', {
            url: '/tabs',
            views: {
                "mainView": {
                    abstract :true,
                    templateUrl: "tabs.tpl.html",
                    controller: function($scope, text) {
                        //Controller in the abstract state is used only to set "global" elements for the state and the sub-states
                        $scope.voice = "Tab Design 4 ui-router";
                        $scope.text = text;
                    },
                    resolve: {
                        text: function ($http) {
                            return $http.get("lorem.ipsum"/*your rest service*/).then(function (result) {
                                return result.data;
                            });
                        }
                    }, //resolve elements useful only for the ENTIRE sub-section
                    data: {} //preload data to be injected in the view
                }
            }
        })
        /*END TABS MENU*/

        /*START FIRST TAB*/
        .state('tabs.first', {
            url: '/firstTab',
            views: {
                "tabs@tabs": {
                    abstract: true,
                    templateUrl: "tabMenu_first.tpl.html",
                    controller: function ($scope) {
                        //Controller in the abstract state is used only to set "global" elements for the state and the sub-states
                        $scope.voice = "Internal sub-menu";
                        $scope.menu = [
                            {state: 'tabs.first.firstTabSub1', name: 'Menu voice 1'},
                            {state: 'tabs.first.firstTabSub2', name: 'Menu voice 2'}
                        ];
                    },
                    resolve: {}
                }
            }
        })
        .state('tabs.first.firstTabSub1', {
            url : '/insideTab1-substate1',
            views:{
                "firstTabMenuContent@tabs.first": {
                    template: "<h5>First Tab's Menu Voice 1</h5>{{text}}",
                    controller: function ($scope) {
                        //In this view we are goint to show some text $scope.text, resolved in the parent abstract state
                        //this is a good idea ONLY because we are goiung to use the same text, the same $scope.text, in the sibling view
                    }
                }
            }
        })
        .state('tabs.first.firstTabSub2', {
            url : '/insideTab2-substate2',
            views:{
                "firstTabMenuContent@tabs.first": {
                    template: "<h5>Second Tab's Menu Voice 2</h5>{{text}}",
                    controller: function ($scope) {
                        //In this view we are goint to show some text $scope.text, resolved in the parent abstract state
                        //this is a good idea ONLY because we are goiung to use the same text, the same $scope.text, in the sibling view
                    }
                }
            }
        })
        /*END FIRST TAB*/

        /*START SECOND TAB*/
        .state('tabs.second', {
            url: '/secondTab',
            views: {
                "tabs@tabs": {
                    abstract: true,
                    templateUrl: "tabContent_second.tpl.html",
                    controller: function ($scope) {
                        //Controller in the abstract state is used only to set "global" elements for the state and the sub-states
                        $scope.voice = "Contextual views with parallel contents";
                    },
                    resolve: {}
                }
            }
        })
        .state('tabs.second.content',{
            url:'/multiple_content',
            views:{
                "left_inside_secondTab@tabs.second":{
                    templateUrl: "left_inside_secondTab.tpl.html",
                    controller: function ($scope) {
                        //Controller in the abstract state is used only to set "global" elements for the state and the sub-states
                    },
                    resolve: {}
                },
                "right_inside_secondTab@tabs.second":{
                    template: "Content in the right column of content tab",
                    controller: function ($scope) {
                        //Controller in the abstract state is used only to set "global" elements for the state and the sub-states
                    },
                    resolve: {}
                }
            }
        })
        .state('tabs.second.content.replace',{
            url:'',
            views:{
                "left_inside_secondTab@tabs.second":{
                    templateUrl: "left_inside_secondTab_replace.html",
                    controller: function ($scope) {
                        //Controller in the abstract state is used only to set "global" elements for the state and the sub-states
                    },
                    resolve: {}
                }
            }
        })
        /*END SECOND TAB*/

        /*END TABS*/

        /*START CONTENT*/
        .state('content', {
            url: '/content',
            views: {
                "mainView": {
                    template: "<div id='container'><h1>{{voice}}</h1>{{text}}</div>",
                    controller: function($scope, text) {
                        //Controller i the abstract state is used only to set "global" elements for the state and the sub-states
                        $scope.voice = "Content example";
                        $scope.text = text;
                    },
                    resolve: { //pre-resolve elements for the state
                        text: function($http) {
                            return $http.get("lorem.ipsum"/*your rest service*/).then(function (result) {
                                return result.data;
                            });
                        }
                    },
                    data: {} //preload data to be injected in the view
                }
            }
        });
    /*END CONTENT*/
});

