import React, { Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { routes } from '../index';

export const RouterSwitch = () => {
  const location = useLocation();

  return (
    <Switch>
      {routes.map(({ name, suspense, component: Component, path, exact }) => (
        <Route
          key={name}
          path={path}
          exact={exact}
          render={props => (
            <Suspense fallback={null}>
              <Component {...props} />
            </Suspense>
          )}
        />
      ))}
      <Route
        key="notFoundPage"
        path={location.pathname}
        render={() => (
          <Suspense fallback={null}>
            <section className="m-containter">
              <h1 className="color-fff">This page does not exist</h1>
            </section>
          </Suspense>
        )}
      />
    </Switch>
  );
};
