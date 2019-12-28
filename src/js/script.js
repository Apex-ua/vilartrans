let routes_json = "./data/routes.json";
let routeContainer = document.getElementById('rootRoutes');
fetch(routes_json)
  .then(response => response.json())
  .then(response => {
    response.routes.forEach(
      (item) => {
        createRoute(item, routeContainer);
      }
    )

  })


function createRoute(data, container) {
  const route = document.createElement('article');
  const routeTitle = document.createElement('h2');
  const schedule = document.createElement('ul');

  route.setAttribute('class', 'route');
  route.setAttribute('id', data.code);

  routeTitle.setAttribute('class', 'heading heading_medium heading_green');
  routeTitle.textContent = data.name;

  route.appendChild(routeTitle);

  data.points.forEach(
    item => {
      let scheduleItem = createScheduleItem(item);
      schedule.appendChild(scheduleItem);
    }
  )

  schedule.setAttribute('class', 'route__schedule');

  route.appendChild(schedule);
  container.appendChild(route);
}

function createScheduleItem(data) {
  const point = document.createElement('li');
  const pointTime = document.createElement('span');
  const pointIcon = document.createElement('span');
  const pointCity = document.createElement('span');
  const pointName = document.createElement('span');
  const pointMapUrl = document.createElement('a');
  const pointAdress = document.createElement('span');

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

  if (data.map_url) {
    pointMapUrl.setAttribute('href', data.map_url);
    pointMapUrl.setAttribute('class', 'point__url');
    pointMapUrl.setAttribute('target', '_blank');
    pointMapUrl.appendChild(pointAdress);
    point.appendChild(pointMapUrl);
  } else {
    point.appendChild(pointAdress);
  }

  return point;
}