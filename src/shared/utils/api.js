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
    const url_base = 'http://localhost:8080'
    console.log(camelcaseKeys(body, { deep: true }));
    return fetch(url_base + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      mode: 'cors',
      body: createFormData(camelcaseKeys(body, { deep: true }))
    })
    .then(res => {
      return res.json()
    })
    .catch(err => {
      window.alert_msg.error(err.messege)
      return Promise.reject(err)
    })
  }

  post_json(url, body) {
    const url_base = 'http://localhost:8080'
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
    .catch(err => {
      window.alert_msg.error(err.messege)
      return Promise.reject(err)
    })
  }

  get(url) {
    fetch(url, {
      mode: 'cors'
    })
    .then(res => res.json())
    .catch(err => window.alert_msg.error(err.messege))
  }
}
