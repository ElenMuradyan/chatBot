'use client'

import chatBot from '../../../public/Images/chatbot.png';
import recomendations from '../../../public/Images/recommendations.jpg';
import aiImage from '../../../public/Images/ai-image.jpg';
import data from '../../../public/Images/data.jpg';
import voice from '../../../public/Images/voice.jpg';
import image from '../../../public/Images/image.jpg';
import sentiment from '../../../public/Images/sentiment-analysis.jpg';
import writing from '../../../public/Images/writing.jpg';
import { useRouter } from 'next/navigation';
import { ROUTE_PATHS } from '@/utilis/constants';

import '../../styles/home.css';

export default function Functions() {
  const { push } = useRouter();

    return (
      <div className="functions-container">
        <h1 className="title">Choose Your AI Function</h1>
        <p className="description">
          Select from the options below to explore the amazing AI-powered features we offer.
        </p>
        
        <div className="functions-list">
          
          {/* AI-Powered Chatbot */}
          <div className="function-card" style={{ backgroundImage: `url(${chatBot.src})` }}>
            <button className="function-btn" onClick={() => push(`${ROUTE_PATHS.AIPOWEREDCHATBOT}/newChat`)}>
              AI-Powered Chatbot
            </button>
          </div>
  
          {/* Personalized Recommendations */}
          <div className="function-card" style={{ backgroundImage:  `url(${recomendations.src})` }}>
            <button className="function-btn">
              Personalized Recommendations
            </button>
          </div>
  
          {/* AI Image Generation */}
          <div className="function-card" style={{ backgroundImage:  `url(${aiImage.src})` }}>
            <button className="function-btn">
              AI Image Generation
            </button>
          </div>
  
          {/* Data Analytics & Visualization */}
          <div className="function-card" style={{ backgroundImage: `url(${data.src})` }}>
            <button className="function-btn">
              Data Analytics & Visualization
            </button>
          </div>
  
          {/* Voice Recognition */}
          <div className="function-card" style={{ backgroundImage:  `url(${voice.src})` }}>
            <button className="function-btn">
              Voice Recognition
            </button>
          </div>
  
          {/* Image Recognition */}
          <div className="function-card" style={{ backgroundImage: `url(${image.src})`}}>
            <button className="function-btn">
              Image Recognition
            </button>
          </div>
  
          {/* Sentiment Analysis */}
          <div className="function-card" style={{ backgroundImage: `url(${sentiment.src})` }}>
            <button className="function-btn">
              Sentiment Analysis
            </button>
          </div>
  
          {/* Predictive Analytics */}
          <div className="function-card" style={{ backgroundImage: `url(${writing.src})` }}>
            <button className="function-btn">
            AI Writing Assistant
            </button>
          </div>
          
          {/* Add other function cards as needed */}
        </div>
      </div>
    );
  }
  