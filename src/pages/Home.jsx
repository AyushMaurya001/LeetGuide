import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { answerAtom, answerStatusAtom, hintAtom, hintIdAtom, pageUrlAtom, questionDetailAtom } from '../store/atom';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { getProblemSlug } from '../lib/utils';
import Markdown from 'react-markdown';

export default function Home() {

  const urlLoadable = useRecoilValueLoadable(pageUrlAtom);

  const setHintId = useSetRecoilState(hintIdAtom);
  const setAnswerStatus = useSetRecoilState(answerStatusAtom);

  const setQuestionDetail = useSetRecoilState(questionDetailAtom);
  const setHint = useSetRecoilState(hintAtom);
  const setAnswer = useSetRecoilState(answerAtom);

  const getHintHandler = async () => {
    
    // set Hint to display on chat
    setHintId(1);

    // get Hint to display on chat

    // get problem details
    let url = "";
    switch (urlLoadable.state){
      case 'loading':
        console.log('loading');
        break;
      case 'hasValue':
        console.log(urlLoadable.contents)
        url = urlLoadable.contents;
        break;
      case 'hasError':
        console.log('error', urlLoadable.contents);
        break;
    }
    let slug = getProblemSlug(url);
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log(slug);
    console.log(apiUrl);
    const questionDetailResponse = await fetch(`${apiUrl}/api/v1/question/getQuestionDetailBySlug/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const questionDetail = await questionDetailResponse.json();
    setQuestionDetail(questionDetail.data);

    // get and set hint
    const hintReqBody = JSON.stringify({
      "details": questionDetail.data
    })
    const hintResponse = await fetch(`${apiUrl}/api/v1/answer/getHintsByDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: hintReqBody
    })
    const hint = await hintResponse.json();
    setHint(hint);

  }

  const getAnswerHandler = async () => {
    
    // set Answer to display on chat
    setAnswerStatus(true);

    // get Answer to display on chat

    // get problem details
    let url = "";
    switch (urlLoadable.state){
      case 'loading':
        console.log('loading');
        break;
      case 'hasValue':
        console.log(urlLoadable.contents)
        url = urlLoadable.contents;
        break;
      case 'hasError':
        console.log('error', urlLoadable.contents);
        break;
    }
    let slug = getProblemSlug(url);
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log(slug);
    console.log(apiUrl);
    const questionDetailResponse = await fetch(`${apiUrl}/api/v1/question/getQuestionDetailBySlug/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const questionDetail = await questionDetailResponse.json();
    setQuestionDetail(questionDetail.data);

    // get and set asnwer
    const answerReqBody = JSON.stringify({
      "details": questionDetail.data
    })
    fetch(`${apiUrl}/api/v1/answer/getAnswerByDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: answerReqBody
    }).then((response) => {
      return response.text();
    }).then((data) => {
      console.log(data);
      setAnswer(data);
    })

  }

  return (
    <div className=' w-full flex flex-col justify-center items-center min-h-[15rem] py-10 px-2 gap-5'>

      <div className='relative flex justify-center items-center'>
        <img
          src='/scene.webp'
          className='w-[10rem] rounded-full'
        />
        <div className='w-[16rem] h-[2.4em] bg-white absolute top-[50%] translate-y-[-50%] flex justify-center items-center rounded-lg z-[3] shadow-md border border-black/20'>
          <p className='font-medium text-xl'>
            You're ready to go 🪄
          </p>
          
        </div>
        <div className='w-[14rem] h-[2.4em] bg-white absolute top-[50%] translate-y-[-30%] flex justify-center items-center rounded-lg z-[2] border border-black/20 shadow-md blur-[0.03rem]'>
        </div>
        <div className='w-[12rem] h-[2.4em] bg-white absolute top-[50%] translate-y-[-10%] flex justify-center items-center rounded-lg z-[1] border border-black/20 shadow-md blur-[0.05rem]'>
        </div>
      </div>

      <p className='text-center text-gray-700'>
        Unlock LeetCode Mastery with LeetGuide: Your Instant Solution Navigator
      </p>

      <div className=' w-full flex flex-col gap-3 justify-center items-center py-4'>

        <NavLink className=' w-[16rem] h-[2.2rem] bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-lg shadow-md border-[0.01rem] border-blue-700 font-medium flex justify-center items-center' onClick={getHintHandler} to={'/chat'}>
          Get Hint
        </NavLink>

        <NavLink className=' w-[16rem] h-[2.2rem] rounded-lg shadow-md border-[0.01rem] border-black/10 font-medium flex justify-center items-center' onClick={getAnswerHandler} to={'/chat'}>
          View Solution
        </NavLink>

      </div>

      <div className=' flex font-medium gap-2 flex-wrap'>
        <p className='text-center text-gray-700 font-normal'>
          Need to learn more?
        </p>
        <Link to={`github`} className=' text-blue-600'>
          Click here
        </Link>
      </div>

    </div>
  )
}
