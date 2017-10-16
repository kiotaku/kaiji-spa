import Api from './api'

class PokerApi extends Api {
  constructor(user_ids) {
    this.user_ids = user_ids
    this.post("/api/poker/create_new_game_room", JSON.stringify({ user_ids }))
      .then(data => this.game_room_id = data.game_room_id)
  }

  call(user_id) {
    if (!this.user_ids.includes(user_id)) {
      return Promise.reject('user_id doesn\'t exist in user_ids.')
    }
    const { game_room_id } = this
    return this.post("/api/poker/call", JSON.stringify({ game_room_id, user_id }))
  }

  raise(user_id, bet_points) {
    if (!this.user_ids.includes(user_id)) {
      return Promise.reject('user_id doesn\'t exist in user_ids.')
    }
    const { game_room_id } = this
    return this.post("/api/poker/raise", JSON.stringify({ game_room_id, user_id, bet_points }))
  }

  check(user_id) {
    if (!this.user_ids.includes(user_id)) {
      return Promise.reject('user_id doesn\'t exist in user_ids.')
    }
    const { game_room_id } = this
    return this.post("/api/poker/call", JSON.stringify({ game_room_id, user_id }))
  }

  fold(user_id) {
    if (!this.user_ids.includes(user_id)) {
      return Promise.reject('user_id doesn\'t exist in user_ids.')
    }
    const { game_room_id } = this
    return this.post("/api/poker/call", JSON.stringify({ game_room_id, user_id }))
  }

  set_winner(winner_id) {
    if (!this.user_ids.includes(user_id)) {
      return Promise.reject('user_id doesn\'t exist in user_ids.')
    }
    const { game_room_id } = this
    return this.post("/api/poker/call", JSON.stringify({ game_room_id, winner_id }))
  }

  destroy_game_room() {
    const { game_room_id } = this
    return this.post("/api/poker/destroy_game_room", JSON.stringify({ game_room_id }))
  }
}
