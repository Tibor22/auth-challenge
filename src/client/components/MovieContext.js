import react from 'react'
import { useReducer } from 'react';
 export const MovieContext = react.createContext();

 const initialState = {};

 function reducer(state, action) {
    switch (action.type) {
      case 'NEW_MOVIE':
        return {...state,movie:action.payload,};
      default:
        throw new Error();
    }
  }



export default function MovieContextWrapper({children}) {

    const [movie, dispatch] = useReducer(reducer, initialState);

    console.log('Movie:', movie);

    return (
      <MovieContext.Provider value={{movie,dispatch}}>
       {children}
      </MovieContext.Provider>
    )
}