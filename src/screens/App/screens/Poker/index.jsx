import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CreateRoom from './screens/CreateRoom'
import InGame from './screens/InGame'
import SetResult from './screens/SetResult'
import ShowResult from './screens/ShowResult'

export default class Poker extends Component {
  render() {
    const base_path = this.props.match.path
    return (
      <div>
        <Route exact path={base_path} component={CreateRoom}/>
        <Route path={`${base_path}/in_game`} component={InGame}/>
        <Route path={`${base_path}/set_result`} component={SetResult}/>
        <Route path={`${base_path}/show_result`} component={ShowResult}/>
      </div>
    )
  }
}
