import { style } from '@mui/system'
import React, { createContext, useReducer } from 'react'
import sytle from '../Youtube.module.css'
const initialState = {
  catDatas: [],
  catThumbnail: [],
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'SET_CATDATAS':
      const catThumbnails = action.payload.catDatas.map(data=>{
        return {
          original: data.snippet.thumbnails.high.url,
          thumbnail: data.snippet.thumbnails.high.url,
          originalTitle: 'aaa',
          thumbnailTitle: 'aaa',
          thumbnailLabel: 'aaa',
        }
      })
      return {...state, catDatas: action.payload.catDatas, catThumbnail: catThumbnails}
    case 'SET_CATTHUMBNAIL':
      return {...state, catThumbnail: action.payload.catThumbnail}
    default:
      return state
  }
}

export const CatStore = createContext({
  globalCatState: initialState,
  setGlobalCatState: ()=>null
})


const CatDataProvider = ({children}) => {
  const [globalCatState, setGlobalCatState] = useReducer(reducer, initialState)
  return (
    <CatStore.Provider value={{globalCatState, setGlobalCatState}}>
      {children}
    </CatStore.Provider>
  )
}

export default CatDataProvider
