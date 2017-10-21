import React, { Component } from 'react'
import { List, ListItem, Divider, RadioButtonGroup, RadioButton, RaisedButton } from 'material-ui'
import { red500, lightGreen500, blue500, indigo500 } from 'material-ui/styles/colors'
import { ArrowDownward, ArrowForward, ArrowUpward } from 'material-ui-icons'

import KaijiApi from '~/shared/utils/kaiji_api'

export default class ShowResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }

    props.history.location.state.users.forEach((user) => {
      KaijiApi.get_user_by_id(user.userId)
      .then((data) => {
        if (!data.isFound) {
          window.alert_msg.error('ユーザーが見つかりません')
          return
        }
        this.setState({
          users: this.state.users.concat(data),
          continue: 'continue'
        })
      })
    })
  }

  onChangeContinue(user_id, e) {
    const value = e.target.value
    this.setState({
      users: this.state.users.map((user) => {
        if (user.userId != user_id) return user
        return {
          ...user,
          continue: value
        }
      })
    })
  }

  submit() {
    this.props.history.push(`${this.props.match.path.split('/').slice(0, -1).join('/')}/`, {
      user_ids: this.state.users.filter((user) => user.continue === 'continue').map((user) => user.userId)
    })
  }

  render() {
    const result_to_color = {
      blackjack: indigo500,
      win: blue500,
      tie: lightGreen500,
      lose: red500
    }
    const result_to_icon = {
      blackjack: <ArrowUpward color={indigo500}/>,
      win: <ArrowUpward color={blue500}/>,
      tie: <ArrowForward color={lightGreen500}/>,
      lose: <ArrowDownward color={red500}/>
    }
    const { results } = this.props.history.location.state
    const { users } = this.state
    return (
      <div>
        <List>
          { users.map((user) => {
            return (
              <div key={user.userId}>
                <ListItem
                  primaryText={`${user.userId}: ${user.name}`}
                  secondaryText={<span style={{ color: result_to_color[results[user.userId]] }}>{ user.point }</span>}
                  leftIcon={result_to_icon[results[user.userId]]}>
                    <RadioButtonGroup
                      name={`${user.userId}-result`}
                      defaultSelected='continue'
                      onChange={this.onChangeContinue.bind(this, user.userId)}>
                      <RadioButton
                        value='end'
                        label='End'/>
                      <RadioButton
                        value='continue'
                        label='Continue'/>
                    </RadioButtonGroup>
                </ListItem>
                <Divider/>
              </div>
            )
          }) }
        </List>
        <RaisedButton style={{'marginTop': 10}} fullWidth={true} label='Next game' primary={true} onClick={this.submit.bind(this)}/>
      </div>
    )
  }
}
