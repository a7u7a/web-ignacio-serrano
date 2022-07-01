import Image from "next/image";

interface HeroItemProps {
  imgSrc: string;
}

const HeroItem = ({ imgSrc }: HeroItemProps) => {
  return (
    <div className="relative w-5/6 shrink-0 snap-start bg-amber-200 ">
      <div className="absolute text-8xl z-30 text-white">hola</div>
      <Image
        src={imgSrc}
        layout="responsive"
        objectFit="cover"
        width={900}
        height={450}
      />
    </div>
  );
};

export default HeroItem;
