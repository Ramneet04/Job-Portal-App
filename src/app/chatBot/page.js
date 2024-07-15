"use client"
import ChatSpinner from '@/components/chatspinner'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Bot } from 'lucide-react'
import React, { useState } from 'react'
require("dotenv").config()
const ChatBot = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    async function generateAnswer(){
        setLoading(true)
        const response = await axios({
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCivDuBJ_D3vbPnVQ7Br2eyqgbxS571Gwc`,
            method: 'POST',
            data: {
                contents: [
                    {
                        parts: [{text: question}]
                    },
                ]
            }
        })
        setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
        setLoading(false);
    }
  return (
    <div className='flex flex-col justify-center items-center mx-auto mt-10 h-full w-[85%] gap-6'>
        <h1 className='text-4xl font-bold text-slate-900 dark:text-white'>JOBSCO CHAT AI</h1>
        <div className='flex gap-2 items-center font-bold'>
        <p className='text-sky-950 text-xl font-bold'>Ask me anything?</p>
        <div className='text-xl'><Bot color='black' size={30}/></div>
        </div>
        <input type='text' className='w-full py-4 px-2 rounded-xl bg-slate-950 text-white outline-sky-950 shadow-md shadow-sky-900' placeholder='Message CHAT AI' value={question} onChange={(e) => setQuestion(e.target.value)}></input>
        <Button onClick={generateAnswer}>Generate Answer</Button>
        <div className='text-slate-900 dark:text-white text-lg font-semibold'>
            {
                loading ? <ChatSpinner/> : answer 
            }
        </div>
    </div>
  )
}

export default ChatBot