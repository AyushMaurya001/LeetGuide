import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Chat, Home, Conversation } from "./pages/index"
import { Layout } from './components/index'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { backendStatusAtom, pageUrlAtom } from './store/atom'
import { getCurrentTabUrl } from './lib/content-script'

export default function App() {

  const [pageUrl, setPageUrl] = useRecoilState(pageUrlAtom);
  const setBackendStatus = useSetRecoilState(backendStatusAtom);

  useEffect(() => {
    getCurrentTabUrl().then((val) => setPageUrl(val)).catch((err) => console.log(err, "error at app.jsx"))
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}`, {
      method: "GET"
    }).then((res) => {
      if (res.status === 200) setBackendStatus(true);
    })
  }, []);

  return (
    
    <Routes>

      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='chat' element={<Chat />} />
        <Route path='conversation' element={<Conversation />} />
      </Route>

    </Routes>

  )
}
