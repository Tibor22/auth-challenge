import "./MoviePopup.css";
import "../pages/movies.css";
import {useState} from "react";
import React, { useContext } from 'react';
import {MovieContext} from './MovieContext';
export default function moviePopup({ movie,openPopup,setOpenPopup ,setSearchTerm}) {
    const token = localStorage.getItem('WEB_TOKEN')
    const userId = localStorage.getItem('UserId')
    const {movie:movieCont,dispatch} = useContext(MovieContext)

    console.log("MOVIE:",movieCont)

	const background = {
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center top",
	};

	console.log("MOVIE:", movie);

    function handleRemovePopup() {
        setOpenPopup(false);

    }

   async function addMovie() {
      dispatch({type:"NEW_MOVIE", payload:{...movie,token,userId}})
      const opts =  {
        method: 'POST',
        headers:{'Content-Type': 'application/json','Authorization': `Bearer ${token}`},
        body: JSON.stringify({userId,movieId:movie.id})
      }
  
      const res = await fetch('http://localhost:4000/movie',opts)
      const data = await res.json()
      console.log("DATA:", data);
      setOpenPopup(false);
      setSearchTerm("")
      
    }


	return (
		<>
			{movie && (
				<div className="movie-container--1">
					<div className="bigger">
                    <div onClick={handleRemovePopup} className="remove-popup">X</div>

						<div
							className="img-popup"
							style={{ background: `url(${movie.imgUrl})`, ...background }}
						></div>
                        
						<div className="movie-list-popup">
							<h3  className="movie-list-popup--title">{movie.title}</h3>
							<h4 className="movie-list-popup--title-h4">Description:</h4>
							<p> {movie.description}</p>
							<p><span className="movie-list-span">Runtime:</span>{movie.runtimeMins} min</p>
                            <button onClick={addMovie} className="movie-popup-btn">Add to list</button>
						</div>
                 
					</div>
				</div>
			)}
		</>
	);
}
