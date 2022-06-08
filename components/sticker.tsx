import { useEffect, useRef, useState } from "react";

function randomAngle() {
  const angles = [10, 15, 20, 25, 30, 35, 40];
  const index = Math.floor(Math.random() * angles.length);
  const mod = Math.round(Math.random()) ? 1 : -1;
  const angle = angles[index] * mod;
  return angle;
}

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomPosition(height: number, width: number) {
  const marginY = 40;
  const marginX = 80;
  return {
    x: randomNumber(marginX, width - marginX),
    y: randomNumber(marginY, height - marginY),
  };
}

const Sticker = ({
  tag,
  color,
  id,
  onEnter,
  onExit,
}: {
  tag: string;
  color:string
  id: string;
  onEnter: (id: string) => void;
  onExit: () => void;
}) => {
  const refContainer = useRef<HTMLInputElement>(null);

  const [angle, setA] = useState(randomAngle());
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (refContainer.current) {
      setDimensions({
        width: refContainer.current.offsetWidth,
        height: refContainer.current.offsetHeight,
      });
    }
  }, []);

  // set sticker pos once proper dims have been set
  if (
    dimensions.height > 0 &&
    dimensions.width > 0 &&
    position.x === 0 &&
    position.y === 0
  ) {
    setPosition(randomPosition(dimensions.height, dimensions.width));
  }

  return (
    <div
      onMouseEnter={() => onEnter(id)}
      onMouseLeave={onExit}
      ref={refContainer}
      className="absolute w-full h-full z-30"
    >
      <svg
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          transform={`rotate(${angle} ,${position.x},${position.y}) translate(${position.x}, ${position.y})`}
        >
          <ellipse
            fill={color}
            stroke="black"
            strokeWidth="0.5"
            rx="43"
            ry="23"
            className="relative"
          />
          <text
            className="text-center"
            style={{
              textAnchor: "middle",
              dominantBaseline: "central",
              fill: "black",
            }}
            fill="white"
          >
            {tag}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Sticker;
