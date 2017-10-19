import React, { Component } from 'react'
import { List, ListItem, Divider, Dialog, FlatButton, RaisedButton } from 'material-ui'

import KaijiApi from '~/shared/utils/kaiji_api'
import BlackjackApi from '~/shared/utils/blackjack_api'
import QRScanModal from '~/shared/components/QRScanModal'

export default class CreateRoom extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      openQRScanModal: false
    }
  }

  openQRScanModal(e) {
    this.setState({
      openQRScanModal: true
    })
  }

  submitQRScanModal(content) {
    KaijiApi.get_user_by_id(content)
      .then((data) => {
        if (!data.isFound) {
          window.alert_msg.error('ユーザーが見つかりません')
          return
        }
        this.setState({
          users: this.state.users.concat(data)
        })
      })
    this.closeQRScanModal()
  }

  closeQRScanModal() {
    this.setState({
      openQRScanModal: false
    })
  }

  createRoom() {
    let blackjackApi = new BlackjackApi(this.state.users.map(user => user.userId))
    this.props.history.push(`${this.props.match.path}/in_game`, {
      blackjackApi,
      users: this.state.users
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeQRScanModal.bind(this)}
      />
    ]

    return (
      <div>
        <List>
          { this.state.users.map((user) => {
            return (
              <div key={user.userId}>
                <ListItem primaryText={`${user.userId}: ${user.name}`} secondaryText={user.point}/>
                <Divider/>
              </div>
            )
          })}
          <ListItem primaryText="参加者を追加" onClick={this.openQRScanModal.bind(this)}/>
        </List>
        <RaisedButton style={{'marginTop': 10}} fullWidth={true} label="ゲーム開始" primary={true} onClick={this.createRoom.bind(this)}/>
        <Dialog title="QR Scan" actions={actions} modal={false} open={this.state.openQRScanModal}>
          <QRScanModal submitModal={this.submitQRScanModal.bind(this)}/>
        </Dialog>
      </div>
    )
  }
}
