'use client'

import { useEffect, useState } from 'react';
import { notification } from 'antd';
import ImageUpload from '@/components/ImgaeUpload/page';
import { DeleteOutlined } from '@ant-design/icons';
import { errorMessage, recognitionPrompts } from '@/utilis/constants';
import RecognizeImage from '@/utilis/helpers/RecognizeImage';

import '../../../styles/imageGeneration.css';
import '../../../styles/imageRecognition.css';

export default function imageRecognition(){
    const [ imageUrl, setImageUrl ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ prompt, setPrompt ] = useState<string>('');
    const [ description, setDescription ] = useState<string>(errorMessage);

    useEffect(()=>{console.log(description);
    }, [description])
    const handleImageRecognition = async () => {
        console.log('hi');   

        if (!prompt && !imageUrl) {
            notification.warning({
              message: 'Please enter a prompt before generating.',
            });
            return;
        };
        try{
            setLoading(true);
            const description = await RecognizeImage({ imageUrl, prompt});
            setDescription(await description);
            }catch(error: any){
                console.log(error.message);
        }finally{
            setLoading(false);
        }
    };
    return(
        <div className="imageGenerationContainer">
            <div className='generationInputContainer'>
            {imageUrl ? (
            <div className="imageRecognitionWrapper">
                <img src={imageUrl} alt="generatedImage" className="image" width={512} height={512} />
                <button className='headerButton' onClick={() => setImageUrl('')}><DeleteOutlined/></button>
            </div>
            ) :
            <ImageUpload setImageUrl={setImageUrl}/>
            }

            <h1>Write Image Prompt</h1>
            <select 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            >
                <option disabled value=''>
                    Select a recognition prompt
                </option>
                {
                    recognitionPrompts.map((option, idx) => 
                        <option value={option} key={idx}>
                            {option}
                        </option>
                    )
                }
            </select>
            <button className='headerButton' onClick={() => handleImageRecognition()} disabled={loading}>
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