import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
  return (
    <div className='flex flex-col min-w-[25rem]'>

      <Header />
      
      <Outlet />

    </div>
  )
}
