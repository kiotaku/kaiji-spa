import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CreateRoom from './screens/CreateRoom'

export default class Blackjack extends Component {
  render() {
    const base_path = this.props.match.path
    return (
      <Route exact path={base_path} component={CreateRoom}/>
    )
  }
}
