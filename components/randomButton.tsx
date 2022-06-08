import Image from "next/image";
import { useState } from "react";

const RandomButton = () => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex relative"
    >
      <Image width={1314} height={670} src={"/uploads/random.png"} />
      <div className="absolute flex w-full h-full items-center justify-center">
        <p className={`text-2xl py-0 px-1 font-mono rounded ${hover?"text-white bg-black":"text-black bg-white"}`}>
          Random
        </p>
      </div>
    </button>
  );
};

export default RandomButton;
