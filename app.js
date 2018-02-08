var app = angular.module('app', ['ngMaterial']);
app.controller('weatherCtrl', function ($scope, $http, $mdDialog, $interval) {
  $scope.header = "Pick some place for weekend";
  $scope.sortBy = '';
  /*Background images slider*/
  $scope.slides = [
    "url('img/1.jpg')",
    "url('img/2.jpg')",
    "url('img/3.jpg')"
  ];
  $scope.slide = $scope.slides[0];
  $interval(function () {
    if ($scope.slide == $scope.slides[0])
      $scope.slide = $scope.slides[1];
    else if ($scope.slide == $scope.slides[1])
      $scope.slide = $scope.slides[2];
    else
      $scope.slide = $scope.slides[0];
  }, 10000, 0);

  /*Array capitals*/
  $scope.capitals = [
    { name: 'Tirana', visited: false, wantVisit: false },
    { name: 'Andorra la Vella', visited: false, wantVisit: false },
    { name: 'Yerevan', visited: false, wantVisit: false },
    { name: 'Vienna', visited: false, wantVisit: false },
    { name: 'Baku', visited: false, wantVisit: false },
    { name: 'Minsk', visited: false, wantVisit: false },
    { name: 'Brussels', visited: false, wantVisit: false },
    { name: 'Sarajevo', visited: false, wantVisit: false },
    { name: 'Sofia', visited: false, wantVisit: false },
    { name: 'Zagreb', visited: false, wantVisit: false },
    { name: 'Prague', visited: false, wantVisit: false },
    { name: 'Copenhagen', visited: false, wantVisit: false },
    { name: 'Tallinn', visited: false, wantVisit: false },
    { name: 'Helsinki', visited: false, wantVisit: false },
    { name: 'Paris', visited: false, wantVisit: false },
    { name: 'Tbilisi', visited: false, wantVisit: false },
    { name: 'Berlin', visited: false, wantVisit: false },
    { name: 'Athens', visited: false, wantVisit: false },
    { name: 'Budapest', visited: false, wantVisit: false },
    { name: 'Reykjavik', visited: false, wantVisit: false },
    { name: 'Dublin', visited: false, wantVisit: false },
    { name: 'Rome', visited: false, wantVisit: false },
    { name: 'Astana', visited: false, wantVisit: false },
    { name: 'Riga', visited: false, wantVisit: false },
    { name: 'Vaduz', visited: false, wantVisit: false },
    { name: 'Vilnius', visited: false, wantVisit: false },
    { name: 'Luxembourg', visited: false, wantVisit: false },
    { name: 'Skopje', visited: false, wantVisit: false },
    { name: 'Valletta', visited: false, wantVisit: false },
    { name: 'Chisinau', visited: false, wantVisit: false },
    { name: 'Monaco', visited: false, wantVisit: false },
    { name: 'Podgorica', visited: false, wantVisit: false },
    { name: 'Amsterdam', visited: false, wantVisit: false },
    { name: 'Oslo', visited: false, wantVisit: false },
    { name: 'Warsaw', visited: false, wantVisit: false },
    { name: 'Lisbon', visited: false, wantVisit: false },
    { name: 'Bucharest', visited: false, wantVisit: false },
    { name: 'Moscow', visited: false, wantVisit: false },
    { name: 'San Marino', visited: false, wantVisit: false },
    { name: 'Belgrade', visited: false, wantVisit: false },
    { name: 'Bratislava', visited: false, wantVisit: false },
    { name: 'Ljubljana', visited: false, wantVisit: false },
    { name: 'Madrid', visited: false, wantVisit: false },
    { name: 'Stockholm', visited: false, wantVisit: false },
    { name: 'Bern', visited: false, wantVisit: false },
    { name: 'Ankara', visited: false, wantVisit: false },
    { name: 'Kyiv', visited: false, wantVisit: false },
    { name: 'London', visited: false, wantVisit: false },
    { name: 'Vatican City', visited: false, wantVisit: false },
  ];
  /*Load capitls from Local Storage */
  $scope.capitals = loadPlaces();
  var weather_key = 'c2ae90a54a80b58a555b3e7554d4e46b';
  /*Weather API*/
  function getWeather() {
    $scope.capitals.forEach(function (obj) {
      $http.get('https://api.openweathermap.org/data/2.5/weather?q=' + obj.name + '&APPID=' + weather_key + '&units=metric').then(function (response) {
        obj.currentWeather = response.data.main.temp;
        obj.minTemp = response.data.main.temp_min;
        obj.maxTemp = response.data.main.temp_max;
        obj.humidity = response.data.main.humidity;
        obj.pressure = response.data.main.pressure;
      }, function (error) {
        console.log('Error');
      });

    });
  }
  getWeather();

  /*Modal Box*/
  $scope.showPrompt = function (ev) {
    var confirm = $mdDialog.prompt()
      .title('Add your own city')
      .textContent('Enter name of city.')
      .placeholder('City name')
      .ariaLabel('City name')
      .initialValue('Lviv')
      .targetEvent(ev)
      .required(true)
      .ok('Okay!')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function (result) {
      for (var capital in $scope.capitals) {
        if (result == $scope.capitals[capital].name) { alert('City is duplicate'); return; }
      };

      $scope.addOwnCity = $scope.capitals.push({ name: result, visited: false, wantVisit: false }); savePlaces();
      getWeather();
    }, function () {

    });
  };
  /*Save selected capitals in Local Storage*/
  $scope.saveSelected = function () {
    $scope.capitals = $scope.capitals;
    savePlaces();
  };
  /*Remove capital from list*/
  $scope.deleteItem = function (item) {
    var index = $scope.capitals.indexOf(item);
    $scope.capitals.splice(index, 1); savePlaces();
    return $scope.capitals;

  };
  /*Local Storage*/
  function savePlaces() {
    var listOfPlaces = JSON.stringify($scope.capitals);
    localStorage.setItem('myPlaces', listOfPlaces);
  };

  function loadPlaces() {
    $scope.capitals = JSON.parse(localStorage.getItem('myPlaces')) || $scope.capitals;
    return $scope.capitals;
  };
  /*Refresh data to default*/
  $scope.toDefault = function () {
    localStorage.removeItem('myPlaces');
    window.location.reload();
    getWeather();
  };

});

