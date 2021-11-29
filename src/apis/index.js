import axios from 'axios'

const KEY = process.env.REACT_APP_API_KEY
const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3'
})

export const fetchNekoData = async() => {
  return await youtube.get('/search',{
    params: {
      part: 'snippet',
      q: '猫　かわいい',
      maxResults: 5,
      key: KEY,
      regionCode: 'JP',
      type: 'video',
    }
  })
}