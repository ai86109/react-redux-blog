import { getAuthToken } from "./utils"

const BASE_URL = 'https://student-json-api.lidemy.me'

export const getPosts = () => {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`).then((res) =>
    res.json()
  )
}

export const getPost = (id) => {
  return fetch(`${BASE_URL}/posts?id=${id}`)
    .then((res) => 
      res.json()
    )
}

export const getPostsList = (postPerPage, page) => {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc&_limit=${postPerPage}&_page=${page}`)
}

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
    })
  })
  .then(res => res.json())
}

export const register = (nickname, username, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    })
  })
  .then(res => res.json())
}

export const getMe = () => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/me`, {
    headers: {
      'authorization': `Bearer ${token}`
    },
  })
  .then(res => res.json())
}

export const newPost = (title, body) => {
  let token = null
  if(getAuthToken()) {
    token = getAuthToken()
  }
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title,
      body,
    })
  })
  .then(res => res.json())
}

export const deletePost = (postId) => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'authorization': `Bearer ${token}`
    },
  }).catch(err => console.log(err))
}

export const updatePost = (title, body, postId) => {
  let token = null
  if(getAuthToken()) {
    token = getAuthToken()
  }
  return fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title,
      body,
    })
  })
  .then(res => res.json())
}