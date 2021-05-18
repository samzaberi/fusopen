import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = { headers: { Authorization: token }, }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, updatedObject) => {
  const response = await axios.put(baseUrl.concat(`/${id}`), updatedObject)
  return response.data
}

const deleteBlog = async (id) => {
  await axios.delete(baseUrl.concat(`/${id}`))
}

export default { getAll, create, setToken, update, deleteBlog }