import React, { Component } from 'react'
import { FlatButton, Dialog, TextField, Checkbox, RaisedButton } from 'material-ui'

import KaijiApi from '~/shared/utils/kaiji_api'
import PrintApi from '~/shared/utils/print_api'
import QRScanModal from '~/shared/components/QRScanModal'

export default class ResisterUser extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      isAnonymous: true,
      openQRScanModal: false
    }
  }

  submit() {
    const { id, name, isAnonymous } = this.state
    KaijiApi.add_user(id, true, false, name, true, isAnonymous)
      .then((data) => PrintApi.print(data.userId))
      .then(() => {
        window.alert_msg.info('登録されました')
        this.setState({
          id: '',
          name: '',
          isAnonymous: true,
        })
      })
  }

  openQRScanModal(e) {
    this.setState({
      openQRScanModal: true
    })
  }

  submitQRScanModal(content) {
    this.setState({
      id: content
    })
    this.closeQRScanModal()
  }

  closeQRScanModal() {
    this.setState({
      openQRScanModal: false
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
      <div className='resister_user'>
        {/* <div style={{position: 'relative', display: 'inline-block', width: '100%', 'marginTop': 10}}>
          <TextField
            name='id'
            value={this.state.id}
            floatingLabelText='id'
            fullWidth={true}
            onChange={(e) => { this.setState({ id: e.target.value }) }}/>
          <FlatButton
            label="スキャン" onClick={this.openQRScanModal.bind(this)}
            style={{position: 'absolute', right: 0}}/>
        </div> */}
        <TextField
          style={{'marginTop': 10}}
          name='name'
          value={this.state.name}
          floatingLabelText='ユーザー名'
          fullWidth={true}
          onChange={(e) => { this.setState({ name: e.target.value }) }}/>
        <Checkbox
          style={{'marginTop': 10}}
          label="匿名希望（ランキングに名前を表示しない）"
          checked={this.state.isAnonymous}
          onClick={(e) => { this.setState({ isAnonymous: e.target.checked }) }}/>
        <RaisedButton style={{'marginTop': 10}} fullWidth={true} label="追加" primary={true} onClick={this.submit.bind(this)}/>
        <Dialog title="QR Scan" actions={actions} modal={false} open={this.state.openQRScanModal}>
          <QRScanModal submitModal={this.submitQRScanModal.bind(this)}/>
        </Dialog>
      </div>
    )
  }
}
