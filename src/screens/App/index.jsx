import { h, Component } from 'preact'
import { BrowserRouter, Link, Route, Switch, withRouter } from 'react-router-dom'
import AlertContainer from 'react-alert'

// import Baccarat from './screens/Baccarat'
// import Blackjack from './screens/Blackjack'
// import Poker from './screens/Poker'
import ResisterUser from './screens/ResisterUser'
// import Settings from './screens/Settings'
import Wrapper from './components/Wrapper'

const Tmp = () => (<Link to='/resister_user'>resister user</Link>)

export default class App extends Component {
  var alertOptions = {
    offset: 14,
    position: 'bottom right',
    theme: 'light',
    time: 5000,
    transition: 'fade'
  }

  render() {
    return (
      <BrowserRouter>
        <AlertContainer ref={a => wimdow.alert_msg = a}, {...this.alertOptions}/>
        <div className='app'>
          <Wrapper>
            <Route exact path='/' component={ Tmp }/>
            {/* { Baccarat } */}
            {/* { Blackjack } */}
            {/* { Poker } */}
            <ResisterUser />
            {/* { Settings } */}
          </Wrapper>
        </div>
      </BrowserRouter>
    )
  }
}
