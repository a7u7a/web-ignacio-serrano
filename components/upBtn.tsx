import Link from "next/link";
import { ArrowElbowLeftUp } from "phosphor-react";
import { useState } from "react";

interface UpButtonProps {
  color: string;
}

const UpButton = ({ color }: UpButtonProps) => {
  const [hover, setHover] = useState(false);
  return (
    <div className="pt-6 px-6" title="Volver">
      <Link href={"/"}>
        <ArrowElbowLeftUp
          className="cursor-pointer z-50"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          color={hover ? "#891FF3" : color}
          size={32}
        />
      </Link>
    </div>
  );
};

export default UpButton;
