'use client'

import writing from '../../../../public/Images/writing.jpg';
import { useRouter } from 'next/navigation';
import { ROUTE_PATHS } from '@/utilis/constants';

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
  <div className="function-card" style={{ backgroundImage: `url(${writing.src})` }}>
    <button className="function-btn" onClick={() => push(`${ROUTE_PATHS.DRAFT_EMAIL}/newChat`)}>
      ✉️ Draft Emails
    </button>
  </div>
  <div className="function-card" style={{ backgroundImage: `url(${writing.src})` }}>
    <button className="function-btn" onClick={() => push(`${ROUTE_PATHS.WRITE_ESSAY}/newChat`)}>
      📚 Write Essays
    </button>
  </div>

  {/* ✍️ Blog or Social Captions */}
  <div className="function-card" style={{ backgroundImage: `url(${writing.src})` }}>
    <button className="function-btn" onClick={() => push(`${ROUTE_PATHS.WRITE_BLOG}/newChat`)}>
      ✍️ Blog & Social Posts
    </button>
  </div>

  {/* 💬 Improve Grammar & Tone */}
  <div className="function-card" style={{ backgroundImage: `url(${writing.src})` }}>
    <button className="function-btn" onClick={() => push(`${ROUTE_PATHS.IMPROVE_TEXT}/newChat`)}>
      💬 Improve Grammar & Tone
    </button>
  </div>

  {/* 🧠 Expand / Shorten Text */}
  <div className="function-card" style={{ backgroundImage: `url(${writing.src})` }}>
    <button className="function-btn" onClick={() => push(`${ROUTE_PATHS.EXPAND_SHORTEN}/newChat`)}>
      🧠 Expand / Shorten Text
    </button>
  </div>
</div>  
</div>
)
}
  