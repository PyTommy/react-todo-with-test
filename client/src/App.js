import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


import Layout from './components/Layout/Layout';
import Alert from './components/Alert/Alert';
import DayPage from './pages/DayPage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/home" component={DayPage} />
          <Route path="/auth" component={AuthPage} />
          <Redirect from="/" exact to="/home" />
        </Switch>
        <Alert />
      </Layout>
    </BrowserRouter>
  );
}

export default App;