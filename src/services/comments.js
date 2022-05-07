import axios from 'axios'
const baseUrl = '/api/blogs'

const create = async (blogId, newComment) => {
  const comment = {
    comment: newComment
  }
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, comment)
  return response.data
}

export default { create }