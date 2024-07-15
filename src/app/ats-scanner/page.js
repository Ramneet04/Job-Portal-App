"use client"
import { Button } from '@/components/ui/button';
import { deFaultJD } from '@/utils';
import axios from 'axios';
import React, { useState } from 'react';
import pdfToText from 'react-pdftotext'

const PdfExtractor = () => {
  const [pdfText, setPdfText] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [loading,setLoading]= useState(false);
  const [jd, setJd] = useState(deFaultJD);
  function extractText(event) {
    const file = event.target.files[0]
    pdfToText(file)
        .then(text => setPdfText(text))
        .catch(error => console.error("Failed to extract text from pdf"))
}
async function generateAnswer(){
    setLoading(true)
    const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCivDuBJ_D3vbPnVQ7Br2eyqgbxS571Gwc`,
        method: 'POST',
        data: {
            contents: [
                {
                    parts: 
                    [{text: 
                        `You are an experienced Technical Human Resource Manager,your task is to review the provided resume against the job description. 
                        Please share your professional evaluation on whether the candidate's profile aligns with the role. 
                        Highlight the strengths and weaknesses of the applicant in relation to the specified job requirements. The resume text is ${pdfText} and job description is ${jd} And give a ATS SCORE out of 100 on the top give in a format like making it seperate 
                        the format is:
                        ATS SCORE:  \n
                        STRENGTHS: \n
                        RECOMENDATIONS \N
                        like this and some more points`
                    }]
                },
            ]
        }
    })
    setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
    setLoading(false);
}

  return (
    <div>
      <h1>PDF Text Extractor</h1>
      <div>
      <input type="file" accept="application/pdf" onChange={extractText}/>
      <Button onClick={generateAnswer}>Check</Button>
        <div>
          <h3>Complete Analysis</h3>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default PdfExtractor;
