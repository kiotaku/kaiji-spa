import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ResisterUser from './components/ResisterUser'

export default () => (
  <Route path='/resister_user' component={ResisterUser}/>
)
