import Image from "next/image";

interface TestProps {
  className?: string;
  label: number;
}

const TestItem = ({ className, label }: TestProps) => {
  return <div className={`${className} h-full bg-slate-500`}>{label}</div>;
};

export default TestItem;
