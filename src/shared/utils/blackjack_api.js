import Api from './api'

class BlackjackApi extends Api {
  constructor(user_ids) {
    this.user_ids = user_ids
    this.post("/api/blackjack/create_new_game_room", JSON.stringify({ user_ids }))
      .then(data => this.game_room_id = data.game_room_id)
  }

  betting(user_id, bet_points) {
    if (!this.user_ids.includes(user_id)) {
      return Promise.reject('user_id doesn\'t exist in user_ids.')
    }
    const { game_room_id } = this
    return this.post("/api/blackjack/betting", JSON.stringify({ game_room_id, user_id, bet_points }))
  }

  set_game_result(game_results) {
    const { game_room_id } = this
    return this.post("/api/blackjack/set_game_result", JSON.stringify({ game_room_id, results: game_results }))
  }

  destroy_game_room() {
    const { game_room_id } = this
    return this.post("/api/blackjack/destroy_game_room", JSON.stringify({ game_room_id }))
  }
}
