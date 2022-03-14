import React from 'react'
import { Outlet } from 'react-router-dom'
import Connect from '../pages/Connect';

const useAuth = () => {
    const user = localStorage.getItem('token');
    if(user){
        return true
    } else {
        return false
    }
}

const PrivateRoute = () => {
    const auth = useAuth();
    return auth?<Outlet/>:<Connect/>
}

export default PrivateRoute 