import React, { useEffect, useState } from 'react';
import './Score.css';

const Score = ({score=0 }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let animationInterval;
    if (score > 0) {
      animationInterval = setInterval(() => {
        setAnimatedScore(prevScore => {
          const increment = Math.ceil(score / 50); // Adjust speed of animation here
          return Math.min(prevScore + increment, score);
        });
      }, 50); // Adjust animation interval here
    }

    return () => clearInterval(animationInterval);
  }, [score]);

  const getColor = () => {
    if (animatedScore >= 7.5) {
      return '0, 128, 0';
    } else if (animatedScore >= 4 && animatedScore < 7.5) {
      return '255, 165, 0';
    } else {
      return '255, 0, 0';
    }
  };

  const renderProgress = () => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const progress = (animatedScore / 10) * circumference;

    return (
      <circle
        className="progress-ring-circle"
        stroke= {`rgba(${getColor()},1)`}
        strokeWidth="8"
        fill="transparent"
        r={radius}
        cx="60"
        cy="60"
        style={{
          strokeDasharray: `${progress} ${circumference}`,
          strokeDashoffset: 0,
        }}
      />
    );
  };

  return (
    <div className="score-main" style={{backgroundColor:`rgba(${getColor()},0.3)`}}>
        <div className="score-container">
          <svg viewBox="0 0 120 120" className="score-svg">
            <circle
              className="progress-ring"
              stroke="#e6e6e6"
              strokeWidth="8"
              fill="transparent"
              r="50"
              cx="60"
              cy="60"
            />
            {renderProgress()}
          </svg>
          <div className="score-value" style={{ color: getColor() }}>
            <p style={{color:`rgb(${getColor()})`}}>{animatedScore.toFixed(1)}/10</p>
          </div>
        </div>
    </div>
  );
};

export default Score;
