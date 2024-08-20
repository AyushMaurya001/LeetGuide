import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { pageUrlAtom, questionDetailAtom } from '../store/atom';
import { getProblemSlug } from '../lib/utils';

export default function ConversationComp() {

  const [chat, setChat] = useState([]);
  const [text, setText] = useState("");
  const setQuestionDetail = useSetRecoilState(questionDetailAtom);
  const urlLoadable = useRecoilValueLoadable(pageUrlAtom);

  useEffect(() => {
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
    axios.get(`${apiUrl}/api/v1/question/getQuestionDetailBySlug/${slug}`, {
      'headers': {
        "Content-Type": "application/json",
      }
    })
    .then((res) => {
      let questionDetail = res?.data?.data
      setChat([
        {
          role: 'user',
          parts: [
            {
              text: `My leetcode problem is ${questionDetail}`,
            }
          ],
        },
        {
          role: 'model',
          parts: [
            {
              text: 'Great to know that. How can I help you?',
            }
          ],
        }
      ])
      setQuestionDetail(questionDetail.data);  
    })
    .catch((err) => console.log('error in conversion comp', err))
  }, []);

  const submit = async () => {
    setText("");
    const currentText = {
      role: 'user',
      parts: [
        {
          text: text
        }
      ],
    };
    setChat([...chat, currentText]);
    const result = await axios.post(import.meta.env.VITE_API_URL + "/api/v1/chat", [...chat, currentText]);
    if (result.data.data){
      setChat([...chat, currentText, {
        role: 'model',
        parts: [
          {
            text: result.data.data,
          }
        ],
      }])
    }
  }

  return (
    <div className='w-full flex flex-col justify-center items-center'>

      <div className='flex gap-2'>
        <input type='text' className=' w-[16rem] h-[2.2rem] rounded-lg shadow-md border-[0.01rem] border-black/10 font-medium flex justify-center items-center p-1 px-3' value={text} onChange={(e)=>setText(e.target.value)} />
        <button className=' w-[6rem] h-[2.2rem] bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-lg shadow-md border-[0.01rem] border-blue-700 font-medium flex justify-center items-center p-1 px-3' onClick={submit}>Send</button>
      </div>

      <div className='w-[92%] flex flex-col gap-2 mt-6'>
        {
          chat.map((content, index) => {
            if (index === 0){
              return <div className='w-full flex justify-start items-center'>
                <div className='w-[60%] bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-md shadow-md border-[0.01rem] border-blue-700 font-medium flex justify-start items-center p-1 px-3'>
                  Problem details provided!
                </div>
              </div>
            } else if (index === 1){
              return <div className='w-full flex justify-end items-center'>
                <div className=' w-[60%] bg-gradient-to-b rounded-md shadow-md border-[0.01rem] font-medium flex justify-end items-center p-1 px-3'>
                  Great to know that. How can I help you?
                </div>
              </div>
            } else if (content.role === "user"){
              return <div className='w-full flex justify-start items-center'>
                <div className='w-[70%] bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-md shadow-md border-[0.01rem] border-blue-700 font-medium flex justify-start items-center p-1 px-3'>
                  {content.parts[0].text}
                </div>
              </div>
            } else {
              return <div className='w-full flex justify-end items-center'>
                <div className=' w-[80%] bg-gradient-to-b rounded-md shadow-md border-[0.01rem] font-medium flex justify-end items-center p-1 px-3'>
                  {content.parts[0].text}
                </div>
              </div>
            }
          })
        }
      </div>

    </div>
  )
}
