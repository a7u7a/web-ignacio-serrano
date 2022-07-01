import Image from "next/image";

interface TestProps {
  src: string;
}

const TestItem = ({ src }: TestProps) => {
  return (
    <div className="relative w-5/6 shrink-0 snap-start bg-amber-200 ">
      <div className="absolute text-8xl z-50 text-white">hola</div>
      <Image
        src={src}
        layout="responsive"
        objectFit="cover"
        width={900}
        height={500}
      />
    </div>
  );
};

export default TestItem;
