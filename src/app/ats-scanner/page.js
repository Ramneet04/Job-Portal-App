"use client"
import { Button } from '@/components/ui/button';
import { deFaultJD } from '@/utils';
import axios from 'axios';
import React, { useState } from 'react';
import pdfToText from 'react-pdftotext';

const PdfExtractor = () => {
  const [pdfText, setPdfText] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jd, setJd] = useState(deFaultJD);

  function extractText(event) {
    const file = event.target.files[0];
    pdfToText(file)
      .then(text => setPdfText(text))
      .catch(error => console.error("Failed to extract text from pdf"));
  }

  async function generateAnswer() {
    setLoading(true);
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCivDuBJ_D3vbPnVQ7Br2eyqgbxS571Gwc`,
        method: 'POST',
        data: {
          contents: [
            {
              parts: [
                {
                  text: `You are an experienced Technical Human Resource Manager,your task is to review the provided resume against the job description. 
                        Please share your professional evaluation on whether the candidate's profile aligns with the role. 
                        Highlight the strengths and weaknesses of the applicant in relation to the specified job requirements. The resume text is ${pdfText} and job description is ${jd}. 
                        And give a ATS SCORE out of 100 on the top and return a simple text`
                }
              ]
            }
          ]
        }
      });
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setError("Failed to generate answer.");
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Resume Scanner</h1>
        <div className="mb-6">
          <input 
            type="file" 
            accept="application/pdf" 
            onChange={extractText} 
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button 
          onClick={generateAnswer} 
          disabled={loading}
          className={`w-full py-2 px-4 ${loading ? 'bg-gray-500' : 'bg-indigo-600'} text-white rounded-lg shadow hover:${loading ? 'bg-gray-500' : 'bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          {loading ? 'Checking...' : 'Check'}
        </button>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Complete Analysis</h3>
          <p className="text-gray-600">{answer}</p>
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default PdfExtractor;
