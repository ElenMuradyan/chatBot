import { voiceRecognitionInterface } from '@/types/voiceRecognition';
import { AudioOutlined, CloseOutlined } from '@ant-design/icons';

export default function VoiceRecognition ({setVoiceMessage}: voiceRecognitionInterface) {
  return (
    <div className='voiceRecognitionContainer'>
      <button><CloseOutlined /></button>
      <button><AudioOutlined /></button>
    </div>
  )
};