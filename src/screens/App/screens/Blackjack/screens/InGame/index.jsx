import React, { Component } from 'react'
import { List, ListItem, Divider, RaisedButton } from 'material-ui'
import NumberInput from 'material-ui-number-input'

export default class InGame extends Component {
  constructor(props){
    super()
    this.state = {
      users: props.history.location.state.users.map((user) => {
        return {
          bet_points: '100',
          ...user
        }
      })
    }
    this.api = props.history.location.state.blackjackApi
  }

  onChangeBetPoint(user_id, e) {
    const value = e.target.value
    this.setState({
      users: this.state.users.map((user) => {
        if (user.userId != user_id) return user
        return {
          ...user,
          bet_points: value
        }
      })
    })
  }

  completeBet() {
    (new Promise((resolve, reject) => {
      this.state.users.forEach((user) => {
        this.api.betting(user.userId, user.bet_points)
          .then((data) => {
            if (data.result != 0) reject()
          })
          .catch(() => reject())
      })
      resolve()
    })).then(() => {
      this.props.history.push(`${this.props.match.path.split('/').slice(0, -1).join('/')}/set_result`, {
        blackjack_api: this.api,
        users: this.state.users
      })
    })
  }

  render() {
    return (
      <div>
        <List>
          { this.state.users.map((user) => {
            return (
              <div key={user.userId}>
                <ListItem
                  primaryText={`${user.userId}: ${user.name}`}
                  secondaryText={user.point}
                  rightIcon={
                    <NumberInput
                      id={`${user.userId}-bet-points`}
                      value={user.bet_points}
                      min={100}
                      max={user.point}
                      style={{ width: 200, height: 40 }}
                      onChange={this.onChangeBetPoint.bind(this, user.userId)}/>
                    }/>
                <Divider/>
              </div>
            )
          })}
        </List>
        <RaisedButton style={{'marginTop': 10}} fullWidth={true} label="ベット完了" primary={true} onClick={this.completeBet.bind(this)}/>
      </div>
    )
  }
}
