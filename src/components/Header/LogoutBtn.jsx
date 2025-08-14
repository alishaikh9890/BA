import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'


const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
    

  return (
    <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 hover:bg-red-400 hover:text-white border border-red-400 text-red-400 rounded ' 
    >
        Logout
    </button>
  )
}

export default LogoutBtn