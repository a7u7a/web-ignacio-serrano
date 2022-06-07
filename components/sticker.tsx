import { useEffect, useRef, useState } from "react";

const Sticker = () => {
  const refContainer = useRef<HTMLInputElement>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const [angle, setA] = useState(randomAngle());
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (refContainer.current) {
      setDimensions({
        width: refContainer.current?.offsetWidth,
        height: refContainer.current?.offsetHeight,
      });
      setPosition(randomPosition());
    }
  }, []);

  function randomAngle() {
    const angles = [10, 15, 20, 25, 30, 35, 40];
    const index = Math.floor(Math.random() * angles.length);
    const mod = Math.round(Math.random()) ? 1 : -1;
    const angle = angles[index] * mod;
    return angle;
  }

  function randomPosition() {
    return {
      x: Math.floor(Math.random() * (dimensions.width - 60)),
      y: Math.floor(Math.random() * (dimensions.height - 40)),
    };
  }
  

  return (
    <div ref={refContainer} className="absolute w-full h-full z-40">
      <svg
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          transform={`rotate(${angle} ,${position.x},${position.y})`}
          fill="#05FF00"
          stroke="black"
          strokeWidth="0.5"
          cx={position.x}
          cy={position.y}
          rx="40"
          ry="20"
        />
      </svg>
    </div>
  );
};

export default Sticker;
