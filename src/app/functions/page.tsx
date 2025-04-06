import '../../styles/home.css';
import chatBot from '../../../public/Images/chatbot.png'
import { log } from 'console';

export default function Functions() {
    return (
      <div className="functions-container">
        <h1 className="title">Choose Your AI Function</h1>
        <p className="description">
          Select from the options below to explore the amazing AI-powered features we offer.
        </p>
        
        <div className="functions-list">
          
          {/* AI-Powered Chatbot */}
          <div className="function-card" style={{ backgroundImage: `url(${chatBot.src})` }}>
            <button className="function-btn">
              AI-Powered Chatbot
            </button>
          </div>
  
          {/* Personalized Recommendations */}
          <div className="function-card" style={{ backgroundImage: 'url(/images/recommendations.jpg)' }}>
            <button className="function-btn">
              Personalized Recommendations
            </button>
          </div>
  
          {/* AI Image Generation */}
          <div className="function-card" style={{ backgroundImage: 'url(/images/ai-image.jpg)' }}>
            <button className="function-btn">
              AI Image Generation
            </button>
          </div>
  
          {/* Data Analytics & Visualization */}
          <div className="function-card" style={{ backgroundImage: 'url(/images/data-analytics.jpg)' }}>
            <button className="function-btn">
              Data Analytics & Visualization
            </button>
          </div>
  
          {/* Natural Language Processing (NLP) */}
          <div className="function-card" style={{ backgroundImage: 'url(/images/nlp.jpg)' }}>
            <button className="function-btn">
              Natural Language Processing
            </button>
          </div>
  
          {/* Voice Recognition */}
          <div className="function-card" style={{ backgroundImage: 'url(/images/voice-recognition.jpg)' }}>
            <button className="function-btn">
              Voice Recognition
            </button>
          </div>
  
          {/* Image Recognition */}
          <div className="function-card" style={{ backgroundImage: 'url(/images/image-recognition.jpg)' }}>
            <button className="function-btn">
              Image Recognition
            </button>
          </div>
  
          {/* Sentiment Analysis */}
          <div className="function-card" style={{ backgroundImage: 'url(/images/sentiment-analysis.jpg)' }}>
            <button className="function-btn">
              Sentiment Analysis
            </button>
          </div>
  
          {/* Predictive Analytics */}
          <div className="function-card" style={{ backgroundImage: 'url(/images/predictive-analytics.jpg)' }}>
            <button className="function-btn">
              Predictive Analytics
            </button>
          </div>
          
          {/* Add other function cards as needed */}
        </div>
      </div>
    );
  }
  