import { useRef, useState } from 'react';
import { AudioOutlined, CloseCircleOutlined } from '@ant-design/icons';
import '../../styles/voiceRecognition.css';
import { voiceRecognitionInterface } from '@/types/voiceRecognition';

export default function VoiceRecognition({
  setVoiceMessage,
  setVoiceRecording,
  endFuncton,
  loading
}: voiceRecognitionInterface) {
  const recognitionRef = useRef<SpeechRecognition | null>(null); 
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState<string>('Turn on the voice Recording and start talking.');
  const [speaking, setSpeaking] = useState<boolean>(false);

  const startListening = () => {
    setMessage('Turn on the voice Recording and start talking.');
    let gotResult = false;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessage('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      gotResult = true;

      if (transcript) {
        setVoiceMessage(transcript);
        const answer = await endFuncton();
        setSpeaking(true);
        speak(answer);
      } else {
        setMessage('Sorry I didn\'t understand what you said.');
      }
    };

    recognition.onerror = () => {
      setMessage('Something is wrong.');
      setIsListening(false);
    };

    recognition.onend = () => {
      stopListening();
      setIsListening(false);

      if (!gotResult) {
        setMessage("I didn't catch anything. Try again?");
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.onend = () => {
      setSpeaking(false);
    };

    speechSynthesis.speak(utterance);
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    setSpeaking(false);
  };

  return (
    <div className="voiceRecognitionContainer" onClick={() => stopListening()}>
      {isListening && <div className="listenLoader" />}
      {speaking && <div className="speakingLoader" />}
      {loading && <div className='voiceLoader' />}
      {!loading && !speaking && !isListening && <h1>{message}</h1>}

      <h1>{isListening ? '...Listening' : ''}</h1>

      <div className='buttonContainer'>
        <button onClick={startListening}>
          <AudioOutlined style={{ color: isListening ? 'white' : 'red' }} />
        </button>
        <button onClick={() => setVoiceRecording(false)}><CloseCircleOutlined /></button>
      </div>

      <h1>Click anywhere to send the message.</h1>
    </div>
  );
}
