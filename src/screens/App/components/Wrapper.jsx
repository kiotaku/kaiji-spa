import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, MenuItem, Drawer } from 'material-ui'

export default class Wrapper extends Component {
  constructor() {
    super()
    this.state = {
      drawerOpen: false
    }
  }

  onToggleDrawerOpen() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }

  handleMenuItemClick(path) {
    this.props.history.push(path)
  }

  render() {
    const { children } = this.props
    const items = [
      { path: '/resister_user', text: 'Resister User' },
      { path: '/blackjack', text: 'Baccarat' },
      { path: '/poker', text: 'Poker' },
    ]
    return (
      <div>
        <Drawer
          docked={false}
          width={200}
          open={this.state.drawerOpen}
          onRequestChange={() => this.onToggleDrawerOpen()}>
          { items.map((item) => {
            return (
              <Link key={item.text} to={item.path}>
                <MenuItem>{item.text}</MenuItem>
              </Link>
            )
          })}
        </Drawer>
        <AppBar
          title='Kaiji Client'
          onLeftIconButtonTouchTap={() => this.onToggleDrawerOpen()}/>
        <div className='wrapper'>
          { children }
        </div>
      </div>
    )
  }
}
