const routeOrganizer = (trains, routes) => trains.reduce((acc, train) => {
  routes.forEach((route) => {
    if (train.name.includes(route.route_id)) {
      if (!acc[train.name]) { acc[train.name] = []; }
      acc[train.name].push(route);
    }
  });
  return acc;
}, {});

export default { routeOrganizer };