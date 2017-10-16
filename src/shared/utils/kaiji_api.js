import Api from './api'

class KaijiApi extends Api {
  ping() {
    return this.get('/api/kaiji/ping')
  }

  log(log_level, user_id, message) {
    return this.post('/api/kaiji/log', JSON.stringify({ log_level, user_id, message }))
  }

  get_user_by_id(user_id) {
    return this.post('/api/kaiji/get_user_by_id', JSON.stringify({ user_id }))
  }

  add_user(user_id, name, isAvailable, isAnonymous) {
    return this.post('/api/kaiji/add_user', JSON.stringify({ user_id, name, isAvailable, isAnonymous }))
  }

  modify_user(user_id, name, isAvailable, isAnonymous) {
    return this.post('/api/kaiji/add_user', JSON.stringify({ user_id, name, isAvailable, isAnonymous }))
  }
}
