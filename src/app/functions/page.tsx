'use client'
import { useRouter } from 'next/navigation';
import { FunctionsArray, ROUTE_PATHS } from '@/utilis/constants';

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
          {
            FunctionsArray.map((item, idx) => {
              return(
                <div className="function-card" key={idx} style={item.style}>
                <button className="function-btn" onClick={() => push(item.route)}>
                  {item.label}
                </button>
              </div>    
              )
            })
          }
        </div>
      </div>
    );
}