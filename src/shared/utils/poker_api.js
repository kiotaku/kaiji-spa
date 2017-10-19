import Api from './api'

export default class PokerApi extends Api {
  constructor(user_ids) {
    super()
    this.user_ids = user_ids
    this.post("/api/poker/create_new_game_room", { user_ids })
      .then(data => {
        console.log(data);
        this.game_room_id = data.gameRoomId
      })
  }

  call(user_id) {
    console.log(this);
    if (!this.user_ids.includes(user_id)) {
      return Promise.reject('user_id doesn\'t exist in user_ids.')
    }
    const { game_room_id } = this
    return this.post("/api/poker/call", { game_room_id, user_id })
  }

  raise(user_id, bet_points) {
    if (!this.user_ids.includes(user_id)) {
      return Promise.reject('user_id doesn\'t exist in user_ids.')
    }
    const { game_room_id } = this
    return this.post("/api/poker/raise", { game_room_id, user_id, bet_points })
  }

  check(user_id) {
    if (!this.user_ids.includes(user_id)) {
      return Promise.reject('user_id doesn\'t exist in user_ids.')
    }
    const { game_room_id } = this
    return this.post("/api/poker/check", { game_room_id, user_id })
  }

  fold(user_id) {
    if (!this.user_ids.includes(user_id)) {
      return Promise.reject('user_id doesn\'t exist in user_ids.')
    }
    const { game_room_id } = this
    return this.post("/api/poker/fold", { game_room_id, user_id })
  }

  set_winner(winner_id) {
    if (!this.user_ids.includes(winner_id)) {
      return Promise.reject('user_id doesn\'t exist in user_ids.')
    }
    const { game_room_id } = this
    return this.post("/api/poker/set_winner", { game_room_id, winner_id })
  }

  destroy_game_room() {
    const { game_room_id } = this
    return this.post("/api/poker/destroy_game_room", { game_room_id })
  }
}
