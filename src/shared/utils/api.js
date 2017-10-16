class Api {
  post(url, body) {
    return fetch(url, {
      method: 'POST',
      headers:  {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body
    })
    .then(res => res.json)
    .catch(err => window.alert_msg.error(err.messege))
  }

  get(url) {
    fetch(url)
    .then(res => res.json)
    .catch(err => window.alert_msg.error(err.messege))
  }
}
