import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const Auth = {
    isAuthenticated: false,
    authenticate() {
        this.isAuthenticated = true
    },
    logout(){
        this.isAuthenticated = false
    }
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
