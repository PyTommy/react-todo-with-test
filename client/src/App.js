import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loadUser } from './store/user/userAction';
import CenterSpinner from './components/UI/CenterSpinner/CenterSpinner';
import Layout from './components/Layout/Layout';
import Alert from './components/Alert/Alert';
import DayPage from './pages/DayPage';
import AuthPage from './pages/AuthPage';

function App() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  let content;
  if (user.loading) {
    content = <CenterSpinner />;
  } else if (user.id === undefined) {
    content = (
      <Fragment>
        <Switch>
          <Route path="/auth" component={AuthPage} />
          <Redirect from="*" to="/auth" />
        </Switch>
        <Alert />
      </Fragment>
    );
  } else {
    content = (
      <Fragment>
        <Switch>
          <Route path="/home" component={DayPage} />
          <Redirect from="*" to="/home" />
        </Switch>
        <Alert />
      </Fragment>
    );
  };

  return (
    <BrowserRouter>
      <Layout>
        {content}
      </Layout>
    </BrowserRouter>
  );
}

export default App;