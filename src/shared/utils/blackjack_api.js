import Api from './api'

export default class BlackjackApi extends Api {
  constructor(user_ids) {
    super()
    this.user_ids = user_ids
    this.post("/api/blackjack/create_new_game_room", { user_ids })
      .then(data => {
        this.game_room_id = data.gameRoomId
      })
  }

  betting(user_id, bet_points) {
    console.log(this);
    if (!this.user_ids.includes(user_id)) {
      return Promise.reject('user_id doesn\'t exist in user_ids.')
    }
    const { game_room_id } = this
    return this.post("/api/blackjack/betting", { game_room_id, user_id, bet_points })
  }

  set_game_result(game_results) {
    const { game_room_id } = this
    return this.post_json("/api/blackjack/set_game_result", { game_room_id, results: game_results })
  }

  destroy_game_room() {
    const { game_room_id } = this
    return this.post("/api/blackjack/destroy_game_room", { game_room_id })
  }
}
