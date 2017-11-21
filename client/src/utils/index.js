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

function timeDifference(current, previous) {

  const milliSecondsPerMinute = 60 * 1000
  const milliSecondsPerHour = milliSecondsPerMinute * 60
  const milliSecondsPerDay = milliSecondsPerHour * 24
  const milliSecondsPerMonth = milliSecondsPerDay * 30
  const milliSecondsPerYear = milliSecondsPerDay * 365

  const elapsed = current - previous

  if (elapsed < milliSecondsPerMinute / 3) {
    return 'just now'
  }

  if (elapsed < milliSecondsPerMinute) {
    return 'less than 1 min ago'
  }

  else if (elapsed < milliSecondsPerHour) {
    let d = Math.round(elapsed/milliSecondsPerMinute)
    if(d === 1) return d + ' minute ago'
    return d + ' minutes ago'
  }

  else if (elapsed < milliSecondsPerDay ) {
    let d = Math.round(elapsed/milliSecondsPerHour )
    if(d === 1) return d + ' hour ago'
    return d + ' hours ago'
  }

  else if (elapsed < milliSecondsPerMonth) {
    let d = Math.round(elapsed/milliSecondsPerDay)
    if(d === 1) return d + ' day ago'
    return d + ' days ago'
  }

  else if (elapsed < milliSecondsPerYear) {
    let d = Math.round(elapsed/milliSecondsPerMonth)
    if(d === 1) return d + ' month ago'
    return d + ' months ago'
  }

  else {
    let d = Math.round(elapsed/milliSecondsPerYear )
    if(d === 1) return d + ' year ago'
    return d + ' years ago'
  }
}

export function timeDifferenceForDate(date) {
  const now = new Date().getTime()
  const updated = new Date(date).getTime()
  return timeDifference(now, updated)
}