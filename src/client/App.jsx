
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';
import React, { useContext } from 'react';
import {UserContext} from './components/UserContext';
import Header from './components/header';
import Home from './pages/home';
import Movies from './pages/movies';

const userId = localStorage.getItem('UserId')
const apiUrl = 'http://localhost:4000';

function App() {
  const [movies, setMovies] = useState([]);
  const {dispatch,state}=  useContext(UserContext)
  const [errorMsg,setErrorMsg] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  let navigate = useNavigate()

// console.log('DISPATCH:',dispatch)
  console.log('VALUE:',state)

  useEffect(() => {
    const token = localStorage.getItem('WEB_TOKEN')
    const userId = localStorage.getItem('UserId')
    if(token) {
      setIsLoading(true)
      fetch(`${apiUrl}/movie?userId=${userId}`,  {
        method: 'GET',
        headers:{'Content-Type': 'application/json','Authorization': `Bearer ${token}`}
      })
        .then(res => res.json())
        .then(res => {
          setMovies(res.data)
        } );
        dispatch({type:"USER_LOGIN",payload: {token:token,userId:userId}})
        setIsLoading(false)
    }
  setErrorMsg(null)
  }, []);

  const handleRegister = async ({ username, password }) => {

    const opts =  {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    }
setIsLoading(true)
    const res = await fetch('http://localhost:4000/user/register',opts)
    const data = await res.json()
    console.log('REGISTER:',data)
    if(data.error) {
    setErrorMsg(data.error)
    setIsLoading(false)
    return
    }
    setErrorMsg(null)
    localStorage.setItem('UserId',data.data.id)
    localStorage.setItem('WEB_TOKEN',data.token)

    dispatch({type:"USER_LOGIN",payload: {username : data.data.username,userId:data.data.id,token :data.token}})
  setMovies([])
  setIsLoading(false)
    navigate('/movies')
  };

  const handleLogin = async ({ username, password }) => {

    const opts =  {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    }
setIsLoading(true)
    const res = await fetch('http://localhost:4000/user/login',opts)
    const data = await res.json()
    console.log('LOGIN:',data)
    if(data.error) {
      setErrorMsg(data.error)
      setIsLoading(false)
      return
    }
    setErrorMsg(null)
    localStorage.setItem('UserId',data.data.userId)
    localStorage.setItem('WEB_TOKEN',data.data.token)
    const token = localStorage.getItem('WEB_TOKEN')
    const userId = localStorage.getItem('UserId')

    const moviesRes = await fetch(`http://localhost:4000/movie?userId=${userId}`,
    {
      method: 'GET',
      headers:{'Content-Type': 'application/json','Authorization': `Bearer ${token}`}
    }
    );
    const moviesData = await moviesRes.json();
  
    setMovies(moviesData.data);
    dispatch({type:"USER_LOGIN",payload: {token,userId}})
    setIsLoading(false)
    navigate('/movies')
 
  };
  
  const handleCreateMovie = async ({ title, description, runtimeMins,imgUrl }) => {
    setIsLoading(true)
    const token = localStorage.getItem('WEB_TOKEN')
    const userId = localStorage.getItem('UserId')
    console.log(title, description, runtimeMins,imgUrl )
    const opts =  {
      method: 'POST',
      headers:{'Content-Type': 'application/json','Authorization': `Bearer ${token}`},
      body: JSON.stringify({title, description, runtimeMins,userId,imgUrl})
    }

    const res = await fetch('http://localhost:4000/movie',opts)
    const data = await res.json()
if(data.error) {
  setErrorMsg(data.error)
  setIsLoading(false)
  return
}
    console.log('LOGIN:',data)
    
    const moviesRes = await fetch(`http://localhost:4000/movie?userId=${userId}`,
    {
      method: 'GET',
      headers:{'Content-Type': 'application/json','Authorization': `Bearer ${token}`}
    }
    );
    const moviesData = await moviesRes.json();
    setIsLoading(false)
    console.log(moviesData)
    navigate('/movies')
    setMovies(moviesData.data);
  

  }

  const handleDeleteMovie = async(movieId) => {
    const token = localStorage.getItem('WEB_TOKEN')
    const moviesRes = await fetch(`http://localhost:4000/movie/${movieId}`,
    {
      method: 'DELETE',
      headers:{'Content-Type': 'application/json','Authorization': `Bearer ${token}`}
    }
    );
    setIsLoading(true)
    const data = await moviesRes.json();
    const id  = +data.data.id;

    console.log('DATA:', data);
    console.log("ID:", id);
    setIsLoading(false)
       setMovies(prevMovies => {
            return prevMovies = prevMovies.filter((movie) => {
              console.log(+movie.movieId,id)
              if(+movie.movieId !== id) return true
              else false
            })
       })
  } 

  console.log(movies)

  return (
    <div className="App">
    
     
      <Header/>
      <Routes>
        <Route  path="/" element={<Home/>}/>
      <Route path="register" element={<UserForm handleSubmit={handleRegister} errorMsg={errorMsg} setErrorMsg={setErrorMsg} isLoading={isLoading}/>}/>
      <Route path="login" element={<UserForm handleSubmit={handleLogin} errorMsg={errorMsg} setErrorMsg={setErrorMsg} isLoading={isLoading}/>}/>
    <Route path="create-movie" element={<MovieForm handleSubmit={handleCreateMovie} isLoading={isLoading} setIsLoading={setIsLoading} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />}/>
     <Route path="movies" element={<Movies movies={movies} handleDeleteMovie={handleDeleteMovie}/>}/>
      </Routes>
     
  
    </div>
  );
}

export default App;