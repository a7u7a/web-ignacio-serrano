import { useState, useEffect } from "react";
import Image from "next/image";
import { sensiblogPost } from "../../interfaces/posts";
import HeroItemText from "./hero-item-text";
import useMediaQuery from "../../lib/media";

interface HeroItemProps {
  post: sensiblogPost;
  lang: string;
}

const HeroItem = ({ post, lang }: HeroItemProps) => {
  const isSm = useMediaQuery("(max-width: 768px)");
  const isMd = useMediaQuery("(max-width: 1280px)");
  const [imgHeight, setImgHeight] = useState(500);

  useEffect(() => {
    if (isSm && isMd) {
      setImgHeight(1350)
    } else if (!isSm && isMd) {
      setImgHeight(800)
    } else {
      setImgHeight(500)
    }
  }, [isSm, isMd]);

  return (
    <div className="relative w-4/6 shrink-0 snap-start overflow-hidden">
      <HeroItemText post={post} lang={lang} />
      {/* Opacity layer */}
      <div className="absolute w-full h-full bg-black opacity-30 z-20" />
      <Image
        src={post.thumbnail}
        layout="responsive"
        objectFit="cover"
        width={900}
        height={imgHeight}
      />
    </div>
  );
};

export default HeroItem;
