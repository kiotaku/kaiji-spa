import React, { Component } from 'react'
import { List, ListItem, Divider } from 'material-ui'
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
          users: this.state.users.concat(data)
        })
      })
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
              </ListItem>
              <Divider/>
            </div>
          )
        }) }
      </List>
    )
  }
}
