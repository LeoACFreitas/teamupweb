import React, { createContext, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './authSlice'

const FetchContext = createContext();

export const FetchProvider = ({ children }) => {
  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()
  
  const fetchWithAuth = (url, options = {}) => {
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }

    return fetch(url, {
      ...options,
      headers,
    }).then((r) => {
      if (r.status == 401) {
        dispatch(logout())
        throw new Error('Unauthorized')
      }
      return r
    }).catch((e) => {
      console.error(e)
    })
  }

  return (
    <FetchContext.Provider value={fetchWithAuth}>
      {children}
    </FetchContext.Provider>
  )
}

export const useFetch = () => useContext(FetchContext);