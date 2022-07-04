import Image from "next/image";

interface TestProps {
  className?: string;
}

const TestItem = ({ className }: TestProps) => {
  return <div className={`${className} w-12 h-12 bg-slate-500`}>hola</div>;
};

export default TestItem;
