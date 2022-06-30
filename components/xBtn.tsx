import Link from "next/link";
import { useState } from "react";
import { X } from "phosphor-react";

interface XButtonProps {
  color: string;
  onClick: () => void;
}

const XButton = ({ onClick, color }: XButtonProps) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      className="fixed p-6 bottom-0 right-0 md:bottom-auto md:top-0"
      onClick={() => onClick()}
    >
      <X
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        color={hover ? "#05FF00" : color}
        size={32}
      />
    </button>
  );
};

export default XButton;
