"use strict";

var routes_json = "./data/routes.json";
var routeContainer = document.getElementById('rootRoutes');
fetch(routes_json).then(function (response) {
  return response.json();
}).then(function (response) {
  response.routes.forEach(function (item) {
    // alert(item.name)
    createRoute(item, routeContainer);
  });
});

function createRoute(data, container) {
  var route = document.createElement('article');
  var routeTitle = document.createElement('h2');
  var schedule = document.createElement('ul');
  route.setAttribute('class', 'route');
  route.setAttribute('id', data.code);
  routeTitle.setAttribute('class', 'heading heading_medium heading_green');
  routeTitle.textContent = data.name;
  route.appendChild(routeTitle);
  data.points.forEach(function (item) {
    var scheduleItem = createScheduleItem(item);
    schedule.appendChild(scheduleItem);
  });
  schedule.setAttribute('class', 'route__schedule');
  route.appendChild(schedule);
  container.appendChild(route);
}

function createScheduleItem(data) {
  var point = document.createElement('li');
  var pointTime = document.createElement('span');
  var pointIcon = document.createElement('span');
  var pointCity = document.createElement('span');
  var pointName = document.createElement('span');
  var pointAdress = document.createElement('span');
  point.setAttribute('class', 'point');
  pointTime.setAttribute('class', 'point__time');
  pointTime.textContent = data.departure;
  pointIcon.setAttribute('class', 'point__icon');
  pointCity.setAttribute('class', 'point__city');
  pointCity.textContent = data.сity;
  pointAdress.setAttribute('class', 'point__adress');
  pointAdress.textContent = data.adress;
  point.appendChild(pointTime);
  point.appendChild(pointIcon);
  point.appendChild(pointCity);

  if (data.name.length > 0) {
    pointName.setAttribute('class', 'point__name');
    pointName.textContent = data.name;
    point.appendChild(pointName);
  }

  point.appendChild(pointAdress);
  return point;
} //   function createCard(inputObject) {
//     const card = document.createElement('div');
//     card.setAttribute('class', 'card');
//     const imgDiv = document.createElement('div');
//     imgDiv.setAttribute('class', 'card-image');
//     imgDiv.setAttribute('id', inputObject.objectNumber);
//     imgDiv.style.backgroundImage = 'url(' + inputObject.headerImage.url + ')';
//     const titleDiv = document.createElement('div');
//     titleDiv.textContent = inputObject.longTitle;
//     titleDiv.setAttribute('class', 'overlay');
//     card.appendChild(imgDiv);
//     card.appendChild(titleDiv);
//     container.appendChild(card);
// }