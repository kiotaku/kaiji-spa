import { h } from 'preact'
import { BrowserRouter, Link, Route, Switch, withRouter } from 'react-router-dom'
// import Baccarat from './screens/Baccarat'
// import Blackjack from './screens/Blackjack'
// import Poker from './screens/Poker'
import ResisterUser from './screens/ResisterUser'
// import Settings from './screens/Settings'
import Wrapper from './components/Wrapper'

const Tmp = () => (<Link to='/resister_user'>resister user</Link>)

export default () => (
  <BrowserRouter>
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
