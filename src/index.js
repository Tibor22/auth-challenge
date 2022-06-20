import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './client/App';
import UserContextWrapper from './client/components/UserContext';
import MovieContextWrapper from './client/components/MovieContext';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

ReactDOM.render(
 
  <React.StrictMode>
     <BrowserRouter>
     <MovieContextWrapper>
    <UserContextWrapper>
    <App />
    </UserContextWrapper>
    </MovieContextWrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
 
);
