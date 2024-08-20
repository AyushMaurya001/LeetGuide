import React from 'react'
import Hint from './Hint';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { answerAtom, answerButtonDisplayStatusAtom, answerStatusAtom, hintIdAtom, pageUrlAtom, questionDetailAtom } from '../store/atom';
import { getProblemSlug } from '../lib/utils';
import { NavLink } from 'react-router-dom';

export default function Hints() {

  const hintId = useRecoilValue(hintIdAtom);

  const urlLoadable = useRecoilValueLoadable(pageUrlAtom);
  const setAnswerStatus = useSetRecoilState(answerStatusAtom);
  const setQuestionDetail = useSetRecoilState(questionDetailAtom);
  const setAnswer = useSetRecoilState(answerAtom);

  const [answerButtonDisplayStatus, setAnswerButtonDisplayStatus] = useRecoilState(answerButtonDisplayStatusAtom);

  const getAnswerHandler = async () => {
    
    // set Answer to display on chat
    setAnswerStatus(true);

    setAnswerButtonDisplayStatus(false);

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
    }).catch((err) => {
      console.log(err);
      setAnswerButtonDisplayStatus(true);
    }).then((response) => {
      return response.text();
    }).then((data) => {
      console.log(data);
      setAnswer(data);
    }).finally(() => {
      setAnswerButtonDisplayStatus(false);
    })

  }

  return (
    <div className='w-full rounded-lg border shadow-sm p-4 flex flex-col gap-1'>

      <h2 className='font-medium text-lg text-gray-500'>
        Hints
      </h2>

      <Hint />

      {
        answerButtonDisplayStatus ?
        <NavLink className=' w-[16rem] h-[2.2rem] rounded-lg shadow-md border-[0.01rem] border-black/10 font-medium flex justify-center items-center' onClick={getAnswerHandler} to={'/chat'}>
          View Solution
        </NavLink> :
        null
      }

    </div>
  )
}
