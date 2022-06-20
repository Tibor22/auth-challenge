import "./header.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import React, { useContext } from 'react';
import {UserContext} from './UserContext';
import { useNavigate } from 'react-router-dom';
import  {useEffect } from 'react'
import { FcFilmReel} from "react-icons/fc";
import { AiOutlineLogin} from "react-icons/ai";
import Search from './Search.js'

export default function header() {
    const {dispatch,state}=  useContext(UserContext)
    const token = localStorage.getItem('WEB_TOKEN')
    const userId = localStorage.getItem('UserId')
    let navigate = useNavigate();

    let activeStyle = {
        backgroundColor:"rgb(162, 162, 220)",
      };

      function logout() {
        localStorage.removeItem('WEB_TOKEN');
        localStorage.removeItem('UserId');
        dispatch({type:"USER_LOGOUT"});
        navigate('/')
      }

	return (
		<div className="header">
			<nav className="nav">
				<ul className="nav-ul">
					{state.isLoggedIn &&<div className="movies">
						<NavLink to="movies" style={({isActive}) => isActive ? activeStyle: undefined}>
							{" "}
							<li className="nav-list">Movies List</li>
						</NavLink>
						<NavLink to="create-movie" style={({isActive}) => isActive ? activeStyle: undefined}>
							{" "}
							<li  className="nav-list">Create a movie  <FcFilmReel/></li>
						</NavLink>
						<Search/>
						
					</div> }

					{!state.isLoggedIn && <NavLink className="register" to="register" style={({isActive}) => isActive ? activeStyle: undefined}>
						<li  className="nav-list">Register</li>
					</NavLink>}
					<NavLink to="login" style={({isActive}) => isActive ? activeStyle: undefined}>
						{" "}
						{!token &&<li  className="nav-list">Login</li>}
					</NavLink>
                    {token && <NavLink to="/"><li  className="nav-list" onClick={logout}>Logout <AiOutlineLogin className="logout"/></li></NavLink> } 
				</ul>
			</nav>
		</div>
	);
}
