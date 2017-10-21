import React, { Component } from 'react'
import { List, ListItem, Divider, RadioButtonGroup, RadioButton, RaisedButton } from 'material-ui'
import { red500, blue500 } from 'material-ui/styles/colors'
import { ArrowDownward, ArrowUpward } from 'material-ui-icons'

import KaijiApi from '~/shared/utils/kaiji_api'

export default class ShowResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }

    props.history.location.state.user_ids.forEach((user_id) => {
      KaijiApi.get_user_by_id(user_id)
      .then((data) => {
        if (!data.isFound) {
          window.alert_msg.error('ユーザーが見つかりません')
          return
        }
        this.setState({
          users: this.state.users.concat(data),
          continue: 'end'
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
      win: blue500,
      lose: red500
    }
    const result_to_icon = {
      win: <ArrowUpward color={blue500}/>,
      lose: <ArrowDownward color={red500}/>
    }
    const { users } = this.state
    return (
      <div>
        <List>
          { users.map((user) => {
            let status = 'lose'
            if (user.userId === this.props.history.location.state.winner_id) status = 'win'
            return (
              <div key={user.userId}>
                <ListItem
                  primaryText={`${user.userId}: ${user.name}`}
                  secondaryText={<span style={{ color: result_to_color[status] }}>{ user.point }</span>}
                  leftIcon={result_to_icon[status]}>
                    <RadioButtonGroup
                      name={`${user.userId}-result`}
                      defaultSelected='end'
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
