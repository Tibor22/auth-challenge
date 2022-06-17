import "./header.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import React, { useContext } from 'react';
import {UserContext} from './UserContext';
import { useNavigate } from 'react-router-dom';
import  {useEffect } from 'react'

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
				<ul>
					{state.isLoggedIn &&<div className="movies">
						<NavLink to="movies" style={({isActive}) => isActive ? activeStyle: undefined}>
							{" "}
							<li>Movies List</li>
						</NavLink>
						<NavLink to="create-movie" style={({isActive}) => isActive ? activeStyle: undefined}>
							{" "}
							<li>Create a movie</li>
						</NavLink>
					</div> }

					{!state.isLoggedIn && <NavLink className="register" to="register" style={({isActive}) => isActive ? activeStyle: undefined}>
						<li>Register</li>
					</NavLink>}
					<NavLink to="login" style={({isActive}) => isActive ? activeStyle: undefined}>
						{" "}
						{!token &&<li>Login</li>}
					</NavLink>
                    {token && <NavLink to="/"><li onClick={logout}>Logout</li></NavLink> } 
				</ul>
			</nav>
		</div>
	);
}
