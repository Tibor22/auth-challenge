import React, { useContext } from 'react';
import {UserContext} from '../components/UserContext';
import './movies.css'

export default function movies({movies,handleDeleteMovie}) {

    const {dispatch,state} = useContext(UserContext)

    const background = {
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center top',
    }
    return (
        <div>
            
 
      <ul className="grid-container">

        {movies && movies.map(movie1 => {
          return (
            <div  key={movie1.movie.id} className="movie-card">
              <div className="overlay">
              <div onClick={(e) => handleDeleteMovie(movie1.movie.id)} className="delete">X</div>
              </div>
                <div className="img-container" style={{background:`url(${movie1.movie.imgUrl})`,...background}}>
              
                </div>
            <li className="movie-list">
              <h3>{movie1.movie.title}</h3>
              <h4>Description:</h4>
              <p> {movie1.movie.description}</p>
              <p>Runtime: {movie1.movie.runtimeMins} min</p>
          
            </li>
            </div>
          );
        })}
      </ul>
        </div>
    )
}