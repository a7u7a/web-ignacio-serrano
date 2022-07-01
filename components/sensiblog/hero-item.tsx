import Image from "next/image";
import { sensiblogPost } from "../../interfaces/posts";
import HeroItemText from "./hero-item-text";

interface HeroItemProps {
  post: sensiblogPost;
  lang: string;
}

const HeroItem = ({ post, lang }: HeroItemProps) => {
  return (
    <div className="relative w-4/6 shrink-0 snap-start overflow-hidden">
      <HeroItemText post={post} lang={lang} />
      <div className="absolute w-full h-full bg-black opacity-30 z-20 " />
      <Image
        src={post.thumbnail}
        layout="responsive"
        objectFit="cover"
        width={900}
        height={500}
      />
    </div>
  );
};

export default HeroItem;
