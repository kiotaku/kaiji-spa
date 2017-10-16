import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch, withRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AlertContainer from 'react-alert'

import Blackjack from './screens/Blackjack'
// import Poker from './screens/Poker'
import ResisterUser from './screens/ResisterUser'
// import Settings from './screens/Settings'
import Wrapper from './components/Wrapper'

export default class App extends Component {
  render() {
    var alertOptions = {
      offset: 14,
      position: 'bottom right',
      theme: 'light',
      time: 5000,
      transition: 'fade'
    }
    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <div>
            <AlertContainer ref={a => window.alert_msg = a} {...this.alertOptions}/>
            <Wrapper>
              <Route path='/blackjack' component={Blackjack}/>
              {/* { Poker } */}
              <ResisterUser />
              {/* { Settings } */}
            </Wrapper>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    )
  }
}
