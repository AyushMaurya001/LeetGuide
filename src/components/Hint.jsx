import React, { useEffect, useState } from 'react'
import { answerButtonDisplayStatusAtom, hintAtom, hintIdAtom } from '../store/atom';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';

export default function Hint() {

  const [hintId, setHintId] = useRecoilState(hintIdAtom);
  const allHintsLoadable = useRecoilValueLoadable(hintAtom);
  const [hints, setHints] = useState([]);

  const setAnswerButtonDisplayStatus = useSetRecoilState(answerButtonDisplayStatusAtom);

  if (allHintsLoadable.state==='loading'){

    return (
      <div className='w-full flex flex-col justify-center items-start gap-2'>
        <div className='w-full bg-slate-100 rounded-lg p-4'>
          <p className=' text-slate-500 w-full text-center'>
            Loading
          </p>
        </div>
      </div>
    )

  } else if (allHintsLoadable.state==='hasValue'){

    useEffect(() => {
      if (allHintsLoadable.contents.data !== undefined){
        setHints(allHintsLoadable.contents.data);
      } else {
        console.log('loading in hasValue');
      }
    }, [allHintsLoadable]);

    if (hints.length===0){

      <div className='w-full flex flex-col justify-center items-start gap-2'>
        <div className='w-full bg-slate-100 rounded-lg p-4 text-black text-center'>
          Loading
        </div>
      </div>

    } else {

      return (
        <div className='w-full flex flex-col justify-center items-start gap-2'>
          <div className='w-full bg-slate-100 rounded-lg p-4 flex flex-col gap-2'>

            {hints.map((hint, index) => {
              if (index<hintId){
                return (<div className='w-full bg-slate-100 rounded-lg flex flex-col gap-2'>
                  <h2 className=' text-black'>
                    Hint {index+1}:
                  </h2>
                  <h2 className=' text-slate-500'>
                    {hint}
                  </h2>
                </div>)
              }
            })}

            {
              hintId>=3 ?
              null :
              <button onClick={() => {
                if (hintId===2) setAnswerButtonDisplayStatus(true);
                setHintId(i => i+1);
              }} className='w-[8.2rem] h-[2.2rem] bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-lg shadow-md border-[0.01rem] border-blue-700 font-medium flex justify-center items-center'>
                Get more hint
              </button>
            }

          </div>
        </div>
      )

    }


  } else {

    return (
      <div className='w-full flex flex-col justify-center items-start gap-2'>
        <div className='w-full bg-slate-100 rounded-lg p-4'>
          <p className=' text-slate-500 w-full text-center'>
            Error
          </p>
        </div>
      </div>
    )
  }

}
