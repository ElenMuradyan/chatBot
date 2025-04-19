'use client'

import { useState } from 'react';
import Image from 'next/image';
import image from '../../../../public/favicon.png';
import GenerateImage from '@/utilis/helpers/GenerateImage';
import { notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { downloadImage } from '@/utilis/helpers/downloadImage';

import '../../../styles/imageGeneration.css';

export default function ImageGeneration(){
    const [ imageUrl, setImageUrl ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ prompt, setPrompt ] = useState<string>('');

    const imageGenerate = async () => {
        setImageUrl('');
        if (!prompt.trim()) {
            notification.warning({
              message: 'Please enter a prompt before generating.',
            });
            return;
        };
        try{
            setLoading(true);
            const url = await GenerateImage(prompt);
            
            if (url) {
                setImageUrl(url);
              } else {
                notification.error({
                  message: 'No image returned from server.',
                });
              }
            }catch( error ){
                const err = error as Error;
            notification.error({
                message: err.message || 'Image generation failed.',                
            })
        }finally{
            setLoading(false);
        }
    };

    return(
        <div className="imageGenerationContainer">
            <div className='generationInputContainer'>
            <h1>Write Image Prompt</h1>
            <input 
            className='generationInput'
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want..."
             />
            <button className='headerButton' onClick={() => imageGenerate()} disabled={loading}>
            {loading ? 'Loading...' : 'GENERATE'}
            </button>
            </div>
            <div className="imageContainer">
            {
                loading ? (
                <div className="loading"><LoadingOutlined /></div>
                ) : imageUrl ? (
                <div className="imageWrapper">
                    <Image src={imageUrl} alt="generatedImage" className="image" width={512} height={512} />
                    <div className="downloadButton">
                    <button className='headerButton' onClick={() => downloadImage(imageUrl)}>Download</button>
                    </div>
                </div>
                ) : (
                <Image src={image.src} alt="placeholderImage" className="image" width={512} height={512} />
                )
            }
            </div>
        </div>
    )
};