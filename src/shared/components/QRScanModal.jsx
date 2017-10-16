import React, { Component } from 'react'
import Instascan from 'instascan'

export default class QRScanModal extends Component {
  componentDidMount() {
    const { submitModal } = this.props
    console.log(this.props);
    let scanner = new Instascan.Scanner({ video: this.preview })
    scanner.addListener('scan', function (content) {
      window.alert_msg.info(content)
      submitModal(content)
    })
    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        window.alert_msg.error('No cameras found.')
      }
    }).catch(function (e) {
      window.alert_msg.error(e)
    })
  }

  render() {
    return (
      <video ref={el => this.preview = el}></video>
    )
  }
}
