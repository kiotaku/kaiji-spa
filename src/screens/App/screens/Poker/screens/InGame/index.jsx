import React, { Component } from 'react'
import { List, ListItem, Divider, Subheader, FlatButton } from 'material-ui'
import { darkWhite } from 'material-ui/styles/colors'
import NumberInput from 'material-ui-number-input'

export default class InGame extends Component {
  constructor(props){
    super()
    this.state = {
      phase: 'first',
      can_action: ['bet', 'check', 'fold'],
      action_user: 0,
      max_point: 0,
      call_count: 0,
      check_count: 0,
      users: props.history.location.state.users.map((user, index) => {
        return {
          ...user,
          bet_points: 100,
          raise_points: '1',
          is_fold: false,
          is_all_in: false
        }
      })
    }
    this.api = props.history.location.state.pokerApi
  }

  onChangeRaisePoint(user_id, e) {
    const value = e.target.value
    this.setState({
      users: this.state.users.map((user) => {
        if (user.userId != user_id) return user
        return {
          ...user,
          raise_points: value
        }
      })
    })
  }

  action_count() {
    const { users, action_user } = this.state
    let next_action_user = action_user + 1
    if (next_action_user >= users.length) {
      next_action_user = 0
    }
    while(users[next_action_user].is_fold || users[next_action_user].is_all_in) {
      next_action_user += 1
    }
    return next_action_user
  }

  action_user() {
    let action_user = 0
    const { users } = this.state
    while (users[action_user].is_fold || users[action_user].is_all_in) {
      action_user += 1
    }
    return action_user
  }

  phaseEnded() {
    const { phase } = this.state
    if (phase == 'first') {
      this.setState({
        phase: 'second',
        can_action: ['bet', 'check', 'fold'],
        action_user: this.action_user(),
        call_count: 0,
        check_count: 0,
        users: this.state.users.map((user) => {
          return {
            ...user,
            raise_points: '1',
          }
        })
      })
      const is_cant_action_user = this.state.users.reduce((acc, user) => acc + (user.is_fold || user.is_all_in ? 1 : 0), 0)
      if (this.state.users.length == is_cant_action_user + 1) this.phaseEnded()
    } else if (phase == 'second') {
      this.props.history.push(`${this.props.match.path.split('/').slice(0, -1).join('/')}/set_result`, {
        poker_api: this.api,
        users: this.state.users,
        fold_users: this.state.users.filter((user) => user.is_fold).map((user) => user.userId)
      })
    }
  }

  callOnClick(user_id, e) {
    this.api.call(user_id)
      .then((data) => {
        let current_user = this.state.users.reduce((acc, user) => {
          if (user.is_fold || user.is_all_in) return acc
          return acc + 1
        }, 0)
        this.setState({
          call_count: this.state.call_count + 1,
          action_user: this.action_count(),
          users: this.state.users.map((user) => {
            if (user.userId != user_id) return user
            return {
              ...user,
              bet_points: data.isAllIn ? user.point : 100 + this.state.max_point,
              is_all_in: data.isAllIn
            }
          })
        })
        if (this.state.call_count == current_user - 1) {
          this.phaseEnded()
        }
        const is_cant_action_user = this.state.users.reduce((acc, user) => acc + (user.is_fold || user.is_all_in ? 1 : 0), 0)
        if (this.state.users.length == is_cant_action_user + 1) this.phaseEnded()
      })
  }

  raiseOnClick(user_id, e) {
    const raise_points = this.state.users.find((user) => user.userId == user_id).raise_points
    this.api.raise(user_id, raise_points)
      .then(() => {
        let can_action = this.state.can_action
        if (can_action.includes('bet') >= 0) {
          can_action.splice(can_action.indexOf('bet'), 1)
          can_action.push('raise')
          can_action.push('call')
        }
        this.setState({
          can_action,
          check_count: 0,
          call_count: 0,
          max_point: this.state.max_point + parseInt(raise_points),
          action_user: this.action_count(),
          users: this.state.users.map((user) => {
            if (user.userId != user_id) return user
            return {
              ...user,
              bet_points: 100 + this.state.max_point + parseInt(raise_points),
              raise_points: '1'
            }
          })
        })
      })
  }

  checkOnClick(user_id, e) {
    this.api.check(user_id)
      .then(() => {
        let can_action = this.state.can_action
        let current_user = this.state.users.reduce((acc, user) => {
          if (user.is_fold || user.is_all_in) return acc
          return acc + 1
        }, 0)
        if (this.state.check_count + 1 >= current_user) {
          if (this.state.phase == 'second') {
            this.phaseEnded()
          }
          this.setState({
            can_action: can_action.filter((x) => "check" != x)
          })
        }
        this.setState({
          check_count: this.state.check_count + 1,
          action_user: this.action_count()
        })
      })
  }

  foldOnClick(user_id, e) {
    this.api.fold(user_id)
      .then(() => {
        this.setState({
          action_user: this.action_count(),
          users: this.state.users.map((user) => {
            if (user.userId != user_id) return user
            return {
              ...user,
              bet_points: user.bet_points - 100,
              is_fold: true
            }
          })
        })
        const is_cant_action_user = this.state.users.reduce((acc, user) => acc + (user.is_fold || user.is_all_in ? 1 : 0), 0)
        if (this.state.users.length == is_cant_action_user + 1) this.phaseEnded()
      })
  }

  render() {
    console.log(this.state);
    const { can_action, action_user, max_point, users } = this.state
    return (
      <div>
        <List>
          <Subheader>{`${this.state.phase}  pot : ${this.state.users.reduce((acc, user) => acc + parseInt(user.bet_points), 0)}  call : ${this.state.max_point}`}</Subheader>
          { this.state.users.map((user, index) => {
            return (
              <div key={user.userId}>
                <ListItem
                  primaryText={<div>{`${user.userId}: ${user.name}`}<br/><div style={{ fontSize: '14px', lineHeight: '16px', height: '16px', margin: '4px 0px 0px' }}>{`points: ${user.point}`}</div></div>}
                  secondaryText={
                      action_user == index ? <div style={{ display: 'table' }}>
                      <FlatButton
                        disabled={!can_action.includes('call')}
                        style={{ display: 'table-cell', margin: 12 }}
                        backgroundColor={darkWhite}
                        label='Call'
                        onClick={this.callOnClick.bind(this, user.userId)}/>
                      <NumberInput
                        id={`${user.userId}-bet-points`}
                        value={user.raise_points}
                        min={1}
                        max={parseInt(user.point) - parseInt(max_point)}
                        style={{ width: 200, height: 40, display: 'table-cell', margin: 12 }}
                        onChange={this.onChangeRaisePoint.bind(this, user.userId)}/>
                      <FlatButton
                        disabled={!(can_action.includes('raise') || can_action.includes('bet'))}
                        style={{ display: 'table-cell', margin: 12 }}
                        backgroundColor={darkWhite}
                        label={ can_action.includes('bet') ? 'Bet' : can_action.includes('raise') ? 'raise' : '' }
                        onClick={this.raiseOnClick.bind(this, user.userId)}/>
                      <FlatButton
                        disabled={!can_action.includes('check')}
                        style={{ display: 'table-cell', margin: 12 }}
                        backgroundColor={darkWhite}
                        label='Check'
                        onClick={this.checkOnClick.bind(this, user.userId)}/>
                      <FlatButton
                        disabled={!can_action.includes('fold')}
                        style={{ display: 'table-cell', margin: 12 }}
                        backgroundColor={darkWhite}
                        label='Fold'
                        onClick={this.foldOnClick.bind(this, user.userId)}/>
                    </div> : <div></div>
                  }/>
                <Divider/>
              </div>
            )
          })}
        </List>
      </div>
    )
  }
}
