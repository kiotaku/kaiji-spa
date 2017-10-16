import Api from './api'

class PointApi extends Api {
  get_point_balance(user_id) {
    return this.post('/api/point/get_point_balance', JSON.stringify({ user_id }))
  }

  add_point(user_id, add_points) {
    return this.post('/api/point/add_point', JSON.stringify({ user_id, add_points }))
  }
}
