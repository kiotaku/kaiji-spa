import React, { Component } from 'react'
import { FlatButton, Dialog } from 'material-ui'

// import KaijiApi from '~/shared/utils/kaiji_api'
import QRScanModal from '~/shared/components/QRScanModal'

export default class ResisterUser extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      name: '',
      isAnonymous: true,
      openQRScanModal: false
    }
  }

  submit() {
    const { id, name, isAnonymous } = this.state
    KaijiApi.add_user(id, name, true, isAnonymous)
    this.setState({
      id: '',
      name: '',
      isAnonymous: true,
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
        <input type='text'
          value={this.state.id}
          placeholder='id'
          onChange={(e) => { this.setState({ id: e.target.value }) }}/>
        <FlatButton label="スキャン" onClick={this.openQRScanModal.bind(this)}/>
        <input type='text'
          value={this.state.name}
          placeholder='ユーザー名'
          onChange={(e) => { this.setState({ name: e.target.value }) }}/>
        <label>
          匿名希望（ランキングに名前を表示しない）
          <input type='checkbox'
            checked={this.state.isAnonymous}
            onChange={(e) => { this.setState({ isAnonymous: e.target.checked }) }}/>
        </label>
        <FlatButton label="追加" primary={true} onClick={this.submit.bind(this)}/>
        <Dialog title="QR Scan" actions={actions} modal={false} open={this.state.openQRScanModal}>
          <QRScanModal submitModal={this.submitQRScanModal.bind(this)}/>
        </Dialog>
      </div>
    )
  }
}
