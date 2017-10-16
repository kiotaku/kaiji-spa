import React, { Component } from 'react'
import { List, ListItem, Divider } from 'material-ui'

export default class CreateRoom extends Component {
  constructor() {
    super()
    this.state = {
      users: [
        { id: 1, name: 'test', points: 2000 },
        { id: 2, name: 'test', points: 2000 },
        { id: 3, name: 'test', points: 2000 },
        { id: 4, name: 'test', points: 2000 }
      ]
    }
  }

  render() {
    return (
      <div>
        <List>
          { this.state.users.map((user) => {
            return (
              <div key={user.id}>
                <ListItem primaryText={user.name} secondaryText={user.points}/>
                <Divider/>
              </div>
            )
          })}
        </List>
      </div>
    )
  }
}
