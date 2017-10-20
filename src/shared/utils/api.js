import camelcaseKeys from 'camelcase-keys'

function createFormData(data) {
  const searchParams = new URLSearchParams();
  for (const prop in data) {
    searchParams.set(prop, data[prop]);
  }
  return searchParams
}

export default class Api {
  post(url, body) {
    const url_base = process.env.NODE_ENV === 'production' ? process.env.API_HOST : 'http://localhost:8080'
    console.log(JSON.stringify(camelcaseKeys(body, { deep: true })));
    return fetch(url_base + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(camelcaseKeys(body, { deep: true }))
    })
    .then(res => {
      return res.json()
    })
    .then(res => {
      console.log(res)
      return res
    })
    .catch(err => {
      window.alert_msg.error(err.messege)
      return Promise.reject(err)
    })
  }

  get(url) {
    const url_base = process.env.NODE_ENV === 'production' ? process.env.API_HOST : 'http://localhost:8080'
    fetch(url_base + url, {
      mode: 'cors'
    })
    .then(res => res.json())
    .catch(err => window.alert_msg.error(err.messege))
  }
}
