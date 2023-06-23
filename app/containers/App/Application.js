import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import { ThemeContext } from './ThemeWrapper';
import {
  Parent,
  DashboardPage,
  BlankPage,
  Form,
  Table,
  Error,
  NotFound,
  AcademicsManagement,
  TestPage,
  ShortCutPage,
} from '../pageListAsync';

function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);
  return (
    <Dashboard
      history={history}
      changeMode={changeMode}
    >
      <Switch>
        <Route
          exact
          path='/back-office/'
          component={ShortCutPage}
        />
        <Route
          exact
          path='/back-office/academics'
          component={AcademicsManagement}
        />
        <Route
          exact
          path='/back-office/testpage'
          component={TestPage}
        />
        <Route
          exact
          path='/back-office/mainmenu'
          component={ShortCutPage}
        />
        {/* <Route exact path="/app" component={BlankPage} /> */}
        <Route
          exact
          path='/back-office/blank-page'
          component={BlankPage}
        />
        <Route
          path='/back-office/pages/dashboard'
          component={DashboardPage}
        />
        <Route
          path='/back-office/pages/form'
          component={Form}
        />
        <Route
          path='/back-office/pages/table'
          component={Table}
        />
        <Route
          path='/back-office/pages/not-found'
          component={NotFound}
        />
        <Route
          path='/back-office/pages/error'
          component={Error}
        />
        <Route
          exact
          path='/back-office/pages'
          component={Parent}
        />
        <Route component={NotFound} />
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
