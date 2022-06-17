import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './client/App';
import UserContextWrapper from './client/components/UserContext';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

ReactDOM.render(
 
  <React.StrictMode>
     <BrowserRouter>
    <UserContextWrapper>
    <App />
    </UserContextWrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
 
);
