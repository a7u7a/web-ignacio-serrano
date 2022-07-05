import Image from "next/image";
import { useState, useEffect } from "react";

interface TestProps {
  className?: string;
  label: number;
}

const TestItem = ({ className, label }: TestProps) => {
  const [color, setColor] = useState("#FFFFFF");
  return (
    <div
      className={`${
        className ? className : ""
      } h-full w-96 border border-amber-500 bg-slate-200`}
    >
      {label}
    </div>
  );
};

export default TestItem;
