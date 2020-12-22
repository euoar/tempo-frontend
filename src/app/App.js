import React, { Component } from 'react';
import { Suspense, lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

const Home = lazy(() => import('./features/home'));
const Locations = lazy(() => import('./features/search'));
const Forecast = lazy(() => import('./features/forecastTable'));
const WindyMap = lazy(() => import('./features/windy'));

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
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {
              routes.map((route, index) =>
                <Route key={index} exact path={route.path} render={() => React.createElement(route.component, {})} />
              )
            }
          </Switch>
        </Suspense>
      </div>
    );

  }
}

export default withRouter(App);