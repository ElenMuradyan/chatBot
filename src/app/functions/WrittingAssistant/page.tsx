'use client'

import { useRouter } from 'next/navigation';
import { WrittingAssistantFunctions } from '@/utilis/constants';

import '../../../styles/home.css';

export default function Functions() {
  const { push } = useRouter();

    return (
<div className="functions-container">
  <h1 className="title">Choose Your Writing Assistant Tool</h1>
  <p className="description">
    Select a writing function below to boost your productivity and creativity using AI.
  </p>

  <div className="functions-list">
    {
        WrittingAssistantFunctions.map((item, index)=> {
            return(
            <div className="function-card" key={index} style={item.style}>
                <button className="function-btn" onClick={() => push(item.route)}>
                  {item.label}
                </button>
              </div>            
            )
        })
    }
</div>  
</div>
)
}
  