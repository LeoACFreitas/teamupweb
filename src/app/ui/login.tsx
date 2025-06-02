'use client'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { setAuth, logout, setUser } from '../lib/authSlice'
import { connect } from 'react-redux'
import { Button } from '@mui/material'
import { useFetch } from '../lib/FetchContext'
import { TOUser } from "../types"
import CreateUserModal from "./createUserModal"

declare const google: any

function Login({ auth }: { auth: any }) {
  const [isClient, setIsClient] = useState(false)
  const [openModalCreateUser, setOpenModalCreateUser] = useState(false)
  const user = useSelector((state: any) => state.auth.user)
  const fetchWithAuth = useFetch()
  const dispatch = useDispatch()

  useEffect(() => {
    setIsClient(true)
  }, [])

  function callbackLogin(obj: any) {
    dispatch(setAuth({ token: obj.credential, isAuthenticated: true }))
  }

  function loadGoogle() {
    setTimeout(function () {
      if (typeof google === 'undefined') {
        loadGoogle()
      } else {
        google.accounts.id.initialize({client_id: "274132790884-ct8a1a5ip9a9b0krvm9rajuefg1e7bho.apps.googleusercontent.com", callback: callbackLogin})
        google.accounts.id.renderButton(document.getElementById("buttonDiv"), { theme: "outline", size: "large" })
        google.accounts.id.prompt()
      }
    }, 1000)
  }

  if (auth.isAuthenticated && (!user || !user.user_id)) {
    fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,).then((r: any) => {
      try {
        if (!r.ok) {
          throw new Error('Failed to fetch data')
        }
        r.json().then((user: TOUser) => {
          if (!user) {
            setOpenModalCreateUser(true)
          } else {
            dispatch(setUser(user))
          }
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    })
  } else if (!auth.isAuthenticated) {
    loadGoogle()
  }

  function logoutUser() {
    dispatch(logout())
  }

  return (
    <>
      <CreateUserModal open={openModalCreateUser} handleClose={() => {setOpenModalCreateUser(false)}} />
      {!auth.isAuthenticated ?
        isClient &&
        <>
          <script src="https://accounts.google.com/gsi/client" async></script>
          <div id="buttonDiv" style={{ display: 'inline-block' }}></div>
        </>
        :
        <Button variant="contained" onClick={logoutUser}>Logout</Button>
      }
    </>
  )
}

const mapStateToProps = (state: any) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Login)