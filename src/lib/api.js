import axios from 'axios'

export const get = (url, params) => {
  return axios.get(url, { params })
}

export const post = (url, params) => {
  let str = Object.keys(params).map(function (key) {
    return key + '=' + params[key]
  }).join('&')
  return axios.post(url, str, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
  })
}

export const getblob = (url, params) => {
  return axios.get(url, { params, responseType: 'blob' })
}

export const fetchData = (data) => {
  let { action, params } = data
  if (!params) {
    params = {}
  } else {
    for (let v in params) {
      if (params[v] === undefined) {
        delete params[v]
      }
    }
  }
  const [ method, url ] = action.split(' ')
  switch (method.toUpperCase()) {
    case 'GET':
      return get(url, params)
    case 'GETBLOB':
      return getblob(url, params)
    default:
      return post(url, params)
  }
}
