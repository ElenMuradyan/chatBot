'use client'

import { useState } from 'react';
import { SentimentAnalysisFunction } from '@/utilis/helpers/SentimentAnalysis';

import '../../../styles/imageGeneration.css';
import '../../../styles/imageRecognition.css';

export default function SentimentAnalysis(){
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ prompt, setPrompt ] = useState<string>('');
    const [ description, setDescription ] = useState<string>('');

    const handleMessageRecognition = async () => {
        try{
            setLoading(true);
            const description = await SentimentAnalysisFunction(prompt);
            setDescription(description);
        }catch( error ){
            const err = error as Error;
            console.log(err.message);
        }finally{
            setLoading(false);
        }
    };

    return(
        <div className="imageGenerationContainer">
            <div className='generationInputContainer'>
            <h1>Write Analisys Message</h1>
            <input 
            className='generationInput'
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Send me the message..."
             />
            <button className='headerButton' onClick={() => handleMessageRecognition()} disabled={loading}>
            {loading ? 'Loading...' : 'DESCRIBE'}
            </button>
            </div>

            <div className='imageDescriptionContainer'>
            <h1>See The Description Here</h1>
            {
                description && <div className='message max-w-[70%] px-4 py-2 text-sm user mr-auto'>
                    {
                        description
                    }
                </div>
            }
            {
                loading && <div className='loader'/>
            }
            </div>            
        </div>
    )
};