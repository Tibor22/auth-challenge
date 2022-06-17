import React, { useContext } from 'react';
import {UserContext} from '../components/UserContext';
import './movies.css'

export default function movies({movies}) {

    const {dispatch,state} = useContext(UserContext)

    const background = {
        backgroundSize:'contain',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
    }
    return (
        <div>
            
 
      <ul className="grid-container">

        {movies && movies.map(movie1 => {
          return (
            <div  key={movie1.movie.id} className="movie-card">
                <div className="img-container" style={{background:`url(${movie1.movie.imgUrl})`,...background}}></div>
            <li>
                   {/* {movie1.movie.imgUrl && <img src={`${movie1.movie.imgUrl}`} alt="" />} */}
              <h3>{movie1.movie.title}</h3>
              <p>Description: {movie1.movie.description}</p>
              <p>Runtime: {movie1.movie.runtimeMins}</p>
          
            </li>
            </div>
          );
        })}
      </ul>
        </div>
    )
}