import React, { useRef, useEffect } from "react";
import lottie, { AnimationItem } from "lottie-web";
import Animation from "../../../public/lottie/Animation.json";
import "@styles/common/Loading.scss";


const Loading: React.FC = () => {
  const animationContainer = useRef<HTMLDivElement>(null);
  let anim: AnimationItem | null = null;

  useEffect(() => {
    if (animationContainer.current) {
      anim = lottie.loadAnimation({
        container: animationContainer.current,
        animationData: Animation,
        loop: true,
        autoplay: true,
      });
    }

    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, []);

  return (
    <div className="spinner-back">
      <div className="spinner-container" ref={animationContainer}></div>
    </div>
  );
};

export default Loading;
