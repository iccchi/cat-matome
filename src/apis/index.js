import axios from 'axios'
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
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

export const fetchRandomNekoData = async() => {
  const date = new Date().getTime()
  const minDate = new Date(2012,0,1,12,30).getTime()
  const afterDate = Math.floor(Math.random()*(date - minDate)) + minDate
  const beforeDate = afterDate - 1000*60*60*24*30*3
  const publishedAfter = new Date(beforeDate).toISOString()
  const publishedBefore = new Date(afterDate).toISOString()
  return await youtube.get('/search',{
    params: {
      part: 'snippet',
      q: '猫　かわいい',
      publishedAfter : publishedAfter,
      publishedBefore: publishedBefore,
      maxResults: 10,
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

export const getNekoLike = async(currentUser, video) => {
  const docRef = doc(db, 'userlike', String(currentUser.id), 'movieList', video.id.videoId)
  const docSnap = await getDoc(docRef)
  let checklike = false
  if (docSnap.exists()){
    console.log("Document data:", docSnap.data())
    checklike = true
  }else{
    console.log("No such document!");
  }
  return checklike
}