import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
//import { isAuth } from './IsAuth'

export default function PrivateRoute() {
    let  userId = localStorage.getItem("token") == null ? false : true;
    return (
        <>
            {userId ? <Outlet  /> : <Navigate to="/Header" />};
        </>

    )
}

/*const PrivateRoute = () => {
    const isAuth = true; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuth() ? <Outlet /> : <Navigate to="/Connect" />;
}*/

/*const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    
      {...rest}
      render={(props) =>
        isLogin() ? <Outlet /> : <Navigate to='../Connect' />
        }
    
  )
}*/

//export default PrivateRoute