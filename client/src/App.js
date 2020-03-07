import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import DayPage from './pages/DayPage';
import variables from './sharedStyle/variables.scss';
import Layout from './components/Layout/Layout';

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <DayPage />
      </Layout>
    </BrowserRouter>
  );
}

export default App;