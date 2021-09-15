import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

import HomePage from './Pages/Home'
import SupportPage from './Pages/Support'

ReactDOM.render(
  <React.StrictMode>
    <HomePage />
    <SupportPage />
  </React.StrictMode>,
  document.getElementById('root')
);
