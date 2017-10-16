import React, { Component } from 'react'

export default class Wrapper extends Component {
  render() {
    const { children } = this.props
    return (
      <div className='wrapper'>
        { children }
      </div>
    )
  }
}
