import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import DayPage from './pages/DayPage';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/home" component={DayPage} />
          <Redirect from="/" exact to="/home" />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;