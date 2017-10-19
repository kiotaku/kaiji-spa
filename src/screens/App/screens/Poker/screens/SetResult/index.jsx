import React, { Component } from 'react'
import { List, ListItem, Subheader, Divider } from 'material-ui'

export default class SetResult extends Component {
  constructor(props) {
    super()
    this.api = props.history.location.state.poker_api
    this.fold_users = props.history.location.state.fold_users
    if (this.fold_users.length + 1 == props.history.location.state.users.length) {
      let winner_id = props.history.location.state.users.find((user) => !this.fold_users.includes(user)).userId
      this.onClickWinner(winner_id)
    }
  }

  onClickWinner(user_id) {
    this.api.set_winner(user_id)
      .then(() => {
        return this.api.destroy_game_room()
      })
      .then(() => {
        this.props.history.push(`${this.props.match.path.split('/').slice(0, -1).join('/')}/show_result`, {
          user_ids: this.props.history.location.state.users.map((user) => user.userId),
          winner_id: user_id
        })
      })
  }

  render() {
    return (
      <div>
        <List>
          <Subheader>Select Winner</Subheader>
          { this.props.history.location.state.users.map((user) => {
            return (
              <div key={user.userId}>
                <ListItem
                  disabled={this.fold_users.includes(user)}
                  primaryText={`${user.userId}: ${user.name}`}
                  secondaryText={user.point}
                  onClick={this.onClickWinner.bind(this, user.userId)}>
                </ListItem>
                <Divider/>
              </div>
            )
          }) }
        </List>
      </div>
    )
  }
}
