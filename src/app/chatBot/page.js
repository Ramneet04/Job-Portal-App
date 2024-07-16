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
<div className="min-h-screen bg-gray-100 dark:bg-slate-950 flex items-center justify-center p-6">
  <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
    <h1 className="text-4xl font-bold mb-6 text-center text-slate-900">JOBSCO CHAT AI</h1>
    <div className="flex gap-2 items-center font-bold">
      <p className="text-xl text-sky-950 ">Ask me anything?</p>
      <div className="text-xl"><Bot color="black" size={30} /></div>
    </div>
    <input 
      type="text" 
      className="w-full py-3 px-4 rounded-lg bg-slate-950 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-950 shadow-md mt-4"
      placeholder="Message CHAT AI" 
      value={question} 
      onChange={(e) => setQuestion(e.target.value)}
    />
    <button 
      onClick={generateAnswer} 
      className={`w-full py-3 px-6 bg-sky-950 text-white rounded-lg shadow-md hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-950 mt-4`}
    >
      {loading ? 'Generating...' : 'Generate Answer'}
    </button>
    <div className="text-lg font-semibold text-slate-900  mt-6">
      {loading ? <ChatSpinner /> : answer}
    </div>
  </div>
</div>


  )
}

export default ChatBot