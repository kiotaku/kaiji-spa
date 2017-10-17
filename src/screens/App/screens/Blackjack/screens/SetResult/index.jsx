import React, { Component } from 'react'
import { List, ListItem, Divider, RaisedButton, RadioButton, RadioButtonGroup } from 'material-ui'

export default class SetResult extends Component {
  constructor(props) {
    super()
    this.api = props.history.location.state.blackjack_api
    let tmp = new Object(null)
    props.history.location.state.users.forEach((user) => {
      tmp[`${user.userId}`]  = 'tie'
    })
    this.state = {
      results: tmp
    }
  }

  onChangeResult(user_id, e) {
    const value = e.target.value
    let { results } = this.state
    results[`${user_id}`] = value
    console.log(results);
    this.setState({
      results: results
    })
  }

  submitResult() {
    this.api.set_game_result(this.state.results)
      .then(() => {
        this.api.destroy_game_room()
      })
      .then(() => {
        this.props.history.push(`${this.props.match.path.split('/').slice(0, -1).join('/')}/show_result`, {
          users: this.props.history.location.state.users,
          results: this.state.results
        })
      })
  }

  render() {
    return (
      <div>
        <List>
          { this.props.history.location.state.users.map((user) => {
            return (
              <div key={user.userId}>
                <ListItem primaryText={user.name} secondaryText={user.point}>
                  <RadioButtonGroup
                    name={`${user.userId}-result`}
                    defaultSelected='tie'
                    onChange={this.onChangeResult.bind(this, user.userId)}>
                    <RadioButton
                      value='blackjack'
                      label='Blackjack Win'/>
                    <RadioButton
                      value='win'
                      label='Win'/>
                    <RadioButton
                      value='tie'
                      label='Tie'/>
                    <RadioButton
                      value='lose'
                      label='Lose'/>
                  </RadioButtonGroup>
                </ListItem>
                <Divider/>
              </div>
            )
          }) }
        </List>
        <RaisedButton style={{'marginTop': 10}} fullWidth={true} label="確定" primary={true} onClick={this.submitResult.bind(this)}/>
      </div>
    )
  }
}
