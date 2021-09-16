import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

import HomePage from './Pages/Home'
import SupportPage from './Pages/Support'

ReactDOM.render(
  <React.StrictMode>
    {
      window.location.pathname === '/support' ?
      <SupportPage /> :
      <HomePage />
    }
  </React.StrictMode>,
  document.getElementById('root')
);
