import React from 'react'
import { Navigate } from 'react-router-dom'

const LoginRoute = ({children}) => {
  const token=localStorage.getItem("admin")
  if (token)
    return <Navigate to="/food" replace/>
  else return children
}

export default LoginRoute