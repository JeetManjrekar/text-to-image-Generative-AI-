import React, { useState, useEffect } from 'react';
import './home_styles.css'; // Import your CSS file 
import a from './a.png';
import b from './b.png';
import c from './c.png';
import d from './d.png';

function Home() {
  const [isRotated, setIsRotated] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const rotateImages = () => {
    setIsRotated(!isRotated);
    setIsShaking(true);

    // Remove the shaking class after 10 seconds
    setTimeout(() => {
      setIsShaking(false);
    }, 10000);
  };

  useEffect(() => {
    if (!isShaking) {
      // Remove the shaking class when isShaking becomes false
      const images = document.querySelectorAll('.shaking');
      images.forEach((image) => {
        image.classList.remove('shaking');
      });
    }
  }, [isShaking]);

  return (
    <div>
      <div id="image-container">
        <img src={a} alt="Image A" id="image-a" className={isShaking ? 'shaking' : ''} />
        <img src={b} alt="Image B" id="image-b" className={isShaking ? 'shaking' : ''} />
        <img src={c} alt="Image C" id="image-c" className={isShaking ? 'shaking' : ''} />
        <img src={d} alt="Image D" id="image-d" className={isShaking ? 'shaking' : ''} />
      </div>
      <button id="rotate-button" onClick={rotateImages}>
        {isRotated ? 'WELCOME TO ARTISTIC AI: TEXT TO IMAGE' : '👤'}
      </button>
    </div>
  );
}

export default Home;
