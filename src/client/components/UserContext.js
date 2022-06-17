import react from 'react'
import { useReducer } from 'react';
 export const UserContext = react.createContext();

 const initialState = {isLoggedIn: false,isRegistered:false};

 function reducer(state, action) {
    switch (action.type) {
      case 'USER_REGISTER':
        return {...state,isRegistered: true,user:action.payload};
      case 'USER_LOGIN':
        return  {...state,isLoggedIn: true,isRegistered: true,token:action.payload};
      case 'USER_LOGOUT':
        return  {isLoggedIn:false,isRegistered: false};
      default:
        throw new Error();
    }
  }



export default function UserContextWrapper({children}) {

    const [state, dispatch] = useReducer(reducer, initialState);

    console.log('STATE:', state);

    return (
      <UserContext.Provider value={{state,dispatch}}>
       {children}
      </UserContext.Provider>
    )
}