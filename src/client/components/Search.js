import "./Search.css";
import { useState } from "react";
import MoviePopup from "./MoviePopup"

export default function Search() {
	const [searchResults, setSearchResults] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
    const [movie,setMovie] = useState(null)
    const [openPopup,setOpenPopup] = useState(false)

	async function handleChange(e) {
		setSearchTerm(e.target.value);
		const term = e.target.value;
		const token = localStorage.getItem("WEB_TOKEN");
		const userId = localStorage.getItem("UserId");
		if (term.length === 0) {
			setSearchResults([]);
			return;
		}

		const res = await fetch(
			`http://localhost:4000/movie?userId=${userId}&searchTerm=${term}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = await res.json();
		console.log("DATA:", data.data);
		setSearchResults(data.data);
	}


    function handleSearch(movie) {

      setMovie(movie)
      setOpenPopup(true)
    }

	return (
        <>
		<div className="search-container">
			<form className="search">
				<input
					autoComplete="off"
					value={searchTerm}
					onChange={(e) => handleChange(e)}
					id="search"
					type="text"
					placeholder="Search movies.."
				/>
			</form>
			<ul id="search-result">
				{ searchTerm && searchResults.map((movie) => {
					
						return (
							<li key={movie.id} onClick={() => handleSearch(movie)}  className="search-result--item">
								<img src={movie.imgUrl} alt={movie.imgUrl ?movie.title : ""} /> 
                                {movie.title}
							</li>
						);
					
				})}
			</ul>
        
		</div>
      {openPopup && <MoviePopup setSearchTerm={setSearchTerm} openPopup={openPopup}  setOpenPopup={setOpenPopup} movie={movie}/> }
        </>
	);
}
