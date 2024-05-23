import React from 'react'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { answerAtom } from '../store/atom'
import Markdown from 'react-markdown';

export default function Answer() {

  const answerLoadable = useRecoilValueLoadable(answerAtom);
  console.log(answerLoadable);

  return (
    <div className='w-full rounded-lg border shadow-sm p-4 flex flex-col gap-1'>

      <h2 className='font-medium text-lg text-gray-500'>
        Answer
      </h2>

      <Markdown className='w-full bg-slate-100 rounded-lg p-4 text-black font-medium overflow-x-scroll'>
        {`${answerLoadable.contents}`}
      </Markdown>

    </div>
  )
}
