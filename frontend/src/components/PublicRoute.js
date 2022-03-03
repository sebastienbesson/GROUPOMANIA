import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
//import { isAuth } from './IsAuth'

export default function PublicRoute() {
    let  userId = localStorage.getItem("token") == null ? true : false;
    return (
        <>
            {userId ? <Outlet  /> : <Navigate to="/Header" />};
        </>

    )
}

/*const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? ( <Navigate to='../Home' />  ) : ( <Component {...props} /> )
        }
    />
  )
}

export default PublicRoute*/