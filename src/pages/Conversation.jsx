import React from 'react'
import { ConversationComp } from '../components'

export default function Conversation() {
  
  return (
    <div className=' w-full flex flex-col justify-center items-center min-h-[15rem] py-10 px-2 gap-5'>
      
      <div className='w-full flex flex-col justify-center items-center gap-2'>
        <img
          src='/problem.svg'
          className=' w-[8rem] bg-sky-500 rounded-full shadow-md'
        />
        <p className='font-medium text-xl'>
          Problem Name
        </p>
      </div>
      
      <ConversationComp />

    </div>
  )
}
