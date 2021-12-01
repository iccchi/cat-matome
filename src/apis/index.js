import axios from 'axios'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';


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

export const fetchRelatedNekoData = async(videoId) => {
  return await youtube.get('/search',{
    params: {
      part: 'snippet',
      relatedToVideoId: videoId,
      maxResults: 5,
      key: KEY,
      regionCode: 'JP',
      type: 'video',
    }
  })
}

export const fetchFavoriteNeko = async(currentUser) => {
  const array = []
  const querySnapshot = await getDocs(collection(db, 'userlike', String(currentUser.id), 'movieList'))
  querySnapshot.forEach((doc)=>{
    array.push({id: doc.id, snippet:doc.data()})
  })
  return array
}