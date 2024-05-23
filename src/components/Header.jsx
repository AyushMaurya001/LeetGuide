import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { backendStatusAtom } from '../store/atom'

export default function Header() {

  const backendStatus = useRecoilValue(backendStatusAtom);

  return (
    <div className=' h-[4rem] border-b shadow-sm flex justify-between items-center px-4'>
      
      <div className='flex items-center gap-3'>
        <NavLink className=' h-[2.5rem] w-[2.5rem] flex justify-center items-center rounded-full border shadow-sm bg-blue-600' to={'/'}>
          <img
            src='/idea.svg'
            className=' h-[1.5rem]'
            draggable='false'
          />
        </NavLink>

        <NavLink className=' font-medium text-lg' to={'/'}>
          LeetGuide
        </NavLink>
      </div>

      {
        backendStatus ?
        null :
        <div className='flex items-center gap-3'>
          <div className=' font-medium'>
            Server is offline
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className=' fill-orange-400 h-[2rem]'><path d="M12.8659 3.00017L22.3922 19.5002C22.6684 19.9785 22.5045 20.5901 22.0262 20.8662C21.8742 20.954 21.7017 21.0002 21.5262 21.0002H2.47363C1.92135 21.0002 1.47363 20.5525 1.47363 20.0002C1.47363 19.8246 1.51984 19.6522 1.60761 19.5002L11.1339 3.00017C11.41 2.52187 12.0216 2.358 12.4999 2.63414C12.6519 2.72191 12.7782 2.84815 12.8659 3.00017ZM10.9999 16.0002V18.0002H12.9999V16.0002H10.9999ZM10.9999 9.00017V14.0002H12.9999V9.00017H10.9999Z"></path></svg>
        </div>
      }

    </div>
  )
}
