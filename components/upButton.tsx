import Link from "next/link";
import { ArrowElbowLeftUp } from "phosphor-react";
import { useState } from "react";

const UpButton = () => {
  const [hover, setHover] = useState(false);

  return (
    <Link href={"/"}>
      <ArrowElbowLeftUp
        className="cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        color={hover ? "#891FF3" : "#000000"}
        size={32}
      />
    </Link>
  );
};

export default UpButton;
