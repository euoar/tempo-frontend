import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from './features/home';
import { Locations } from './features/search';
import { Forecast } from './features/forecastTable';
import { WindyMap } from './features/windy';

class App extends Component {
  constructor(props) {
    super();
  }

  render() {
    const routes = [
      {
        path: '/',
        component: Home
      },
      {
        path: '/locations',
        component: Locations
      },
      {
        path: '/forecast',
        component: Forecast
      },
      {
        path: '/windy',
        component: WindyMap
      }
    ];

    return (
      <div className="App">
        <Switch>
          {
            routes.map((route, index) =>
              <Route key={index} exact path={route.path} render={() => React.createElement(route.component, {})} />
            )
          }
        </Switch>
      </div>
    );

  }
}

export default withRouter(App);