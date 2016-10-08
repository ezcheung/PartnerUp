'use strict';

describe('On the User History page,', function() {
  beforeEach(module('PU'));

  var $rootScope;
  var $scope;
  var createController;
  var $routeParams;
  var $location;

  var testPools = [
    {name: "Class 1", id: 1, role: "student", size: 2},
    {name: "Joe's Group", id: 2, role: "instructor", size: 3}
  ];

  var testStus = [
    {
      user: {
        name: "Elliot Cheung",
        uid: "0"
      },
      role: "student"
    },
    {
      user: {
        name: "Kathryn Hansen",
        uid: "1"
      },
      role: "student"
    },
    {
      user: {
        name: "Ryan Walter",
        uid: "2"
      },
      role: "student"
    },
    {
      user: {
        name: "Iliya Svirsky",
        uid: "3"
      },
      role: "student"
    },
    {
      user: {
        name: "Gilbert Garza",
        uid: '4'
      },
      role: 'instructor'
    },
    {
      user: {
        name: "Jimmy Stevenson",
        uid: '5'
      },
      role: 'fellow'
    }
  ];

  var pools = [
    {
      title: "Pool0",
      generations: [
        {
          title: "WithZeroAndOne",
          group: [testStus[0], testStus[1]]
        },
        {
          title: "WithTwoAndThree",
          group: [testStus[2], testStus[3]]
        }
      ]
    },
    {
      title: "Pool1",
      generations: [
        {
          title: "WithZeroAndOne2",
          group: [testStus[0], testStus[1]]
        }
      ]
    }
  ];

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $routeParams = $injector.get('$routeParams');
    $location = $injector.get('$location');

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('UserHistoryController', {
        $scope: $scope
      });
    };
  }));

  describe('The filter functions', function() {
    describe('$scope.filterPools', function() {
      it('should be defined', function() {
        createController();
        expect($scope.filterPools).toBeDefined();
      });
      it('should be able to filter pools by title', function() {
        createController();
        $scope.searchPools = "1";
        expect($scope.filterPools(pools[1])).toBe(true);
        expect($scope.filterPools(pools[0])).toBe(false);
      });
      it('should be case-insensitive', function() {
        createController();
        $scope.searchPools = "pOoL1";
        expect($scope.filterPools(pools[1])).toBe(true);
        expect($scope.filterPools(pools[0])).toBe(false);
      });
      it('should return true if there is no search parameter', function() {
        createController();
        expect($scope.filterPools(pools[1])).toBe(true);
        expect($scope.filterPools(pools[0])).toBe(true);
        $scope.searchPools = '';
        expect($scope.filterPools(pools[1])).toBe(true);
        expect($scope.filterPools(pools[0])).toBe(true);
      });
    });
    describe('$scope.filterGensByName', function() {
      it('should be defined', function() {
        createController();
        expect($scope.filterGensByName).toBeDefined();
      });
      it('should be able to filter generations by name', function() {
        createController();
        $scope.searchGens = "WithZeroAndOne";
        expect($scope.filterGensByName(pools[1].generations[0])).toBe(true);
        expect($scope.filterGensByName(pools[0].generations[1])).toBe(false);
        expect($scope.filterGensByName(pools[0].generations[0])).toBe(true);
      });
      it('should be case-insensitive', function() {
        createController();
        $scope.searchGens = "thzERoaNDo";
        expect($scope.filterGensByName(pools[1].generations[0])).toBe(true);
        expect($scope.filterGensByName(pools[0].generations[1])).toBe(false);
      });
      it('should return true if there is no search parameter', function() {
        createController();
        expect($scope.filterGensByName(pools[1].generations[0])).toBe(true);
        expect($scope.filterGensByName(pools[0].generations[0])).toBe(true);
        $scope.searchPools = '';
        expect($scope.filterGensByName(pools[1].generations[0])).toBe(true);
        expect($scope.filterGensByName(pools[0].generations[0])).toBe(true);
      });
    });
  });
});
