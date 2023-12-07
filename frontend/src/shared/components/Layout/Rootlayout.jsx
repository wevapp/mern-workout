import React from 'react'
import { Outlet } from 'react-router-dom'

import Nav from '../../../components/Nav'

const Rootlayout = () => {
  return (
    <div className='container m-auto'>
        <Nav />
       <Outlet />
    </div>
  )
}

export default Rootlayout