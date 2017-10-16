import { h, Component } from 'preact'
import KaijiApi from 'shared/utils/kaiji_api'

export default class ResisterUser extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      name: '',
      isAnonymous: true,
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

  render() {
    return (
      <div className='resister_user'>
        <input type='text'
          value={this.state.id}
          placeholder='id'
          onChange={(e) => { this.setState({ id: e.target.value }) }}/>
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
        <button onClick={this.submit.bind(this)}>追加</button>
      </div>
    )
  }
}
