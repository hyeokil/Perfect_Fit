import React, { useRef, useEffect, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";
import "@styles/common/Loading.scss";

const Loading: React.FC = () => {
  const animationContainer = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState(null);
  let anim: AnimationItem | null = null;

  useEffect(() => {
    fetch('/lottie/Animation.json')
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
      })
      .catch(error => {
        console.error('Error fetching animation data:', error);
      });
  }, []);

  useEffect(() => {
    if (animationContainer.current && animationData) {
      anim = lottie.loadAnimation({
        container: animationContainer.current,
        animationData: animationData,
        loop: true,
        autoplay: true,
      });
    }

    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, [animationData]);

  return (
    <div className="spinner-back">
      <div className="spinner-container" ref={animationContainer}></div>
    </div>
  );
};

export default Loading;
