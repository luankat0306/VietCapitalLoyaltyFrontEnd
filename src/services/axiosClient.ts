import { API_URL } from '@utils/urls'
import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/json',
    // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM1MzQxMjUyLCJleHAiOjE2Mzc5MzMyNTJ9.9OEl4ZMhQ1uYqeaj-aUNlUY31-4BYG08RiK-KEIf11I`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
})
// axiosClient.interceptors.response.use((error) => {
//   throw error
// })

export default axiosClient
