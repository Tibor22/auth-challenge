import React, { useContext } from 'react';
import {UserContext} from '../components/UserContext';
import './movies.css'

export default function movies({movies}) {

    const {dispatch,state} = useContext(UserContext)
    return (
        <div>
            
 
      <ul className="grid-container">

        {movies && movies.map(movie1 => {
          return (
            <li key={movie1.movie.id}>
              <h3>{movie1.movie.title}</h3>
              <p>Description: {movie1.movie.description}</p>
              <p>Runtime: {movie1.movie.runtimeMins}</p>
            </li>
          );
        })}
      </ul>
        </div>
    )
}