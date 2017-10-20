import camelcaseKeys from 'camelcase-keys'

export default PrintApi = {
  print(user_id) {
    const magX = 1, magY = 1, font = '12x24', errorLevel = 'H', size = 'max'
    return this.get('/new_job')
      .then(data => this.id = data.id)
      .then(() => {
        const id = this.id
        return this.post('/print', { id, text: '\r\r確率統計録\r　　　 カイジ\r', font, magX: 2, magY: 2 })
      })
      .then(() => {
        const id = this.id
        return this.post('/print', { id, text: '10月21日(土),22日(日)限り有効\r\r\r\r', font, magX, magY })
      })
      .then(() => {
        const id = this.id
        return this.post('/print_qr', { id, text: user_id, errorLevel, size })
      })
      .then(() => {
        const id = this.id
        return this.post('/print', { id, text: '\r\r\r', font, magX, magY })
      })
      .then(() => {
        const id = this.id
        return this.post('/print', { id, text: user_id, font: 'large', magX, magY })
      })
      .then(() => {
        const id = this.id
        return this.post('/print', { id, text: '\r\r※再発行は受け付けません。\r\r\r\r\r\r\r\r', font, magX, magY })
      })
      // .then(() => {
      //   const id = this.id
      //   return this.post('/end_job', { id })
      // })
  },

  post(url, body) {
    const url_base = process.env.PRINT_API_HOST
    console.log(JSON.stringify(camelcaseKeys(body, { deep: true })));
    return fetch(url_base + url, {
      method: 'POST',
      headers: {
        Connection: 'close'
      },
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify(camelcaseKeys(body, { deep: true }))
    })
    .then((res) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(res);
          resolve(res)
        }, 500)
      })
    })
    .catch(err => {
      window.alert_msg.error(err.messege)
      return Promise.reject(err)
    })
  },

  get(url) {
    const url_base = process.env.PRINT_API_HOST
    return fetch(url_base + url, {
      mode: 'cors'
    })
    .then(res => res.json())
    .catch(err => window.alert_msg.error(err.messege))
  }
}
