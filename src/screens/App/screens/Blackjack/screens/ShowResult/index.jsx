import React, { Component } from 'react'
import { List, ListItem, Divider } from 'material-ui'
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
          users: this.state.users.concat(data)
        })
      })
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
      <List>
        { users.map((user) => {
          return (
            <div key={user.userId}>
              <ListItem
                primaryText={user.name}
                secondaryText={<span style={{ color: result_to_color[results[user.userId]] }}>{ user.point }</span>}
                leftIcon={result_to_icon[results[user.userId]]}>
              </ListItem>
              <Divider/>
            </div>
          )
        }) }
      </List>
    )
  }
}
