import Image from "next/image";
import { sensiblogPost } from "../../interfaces/posts";
import HeroItem from "./hero-item";
import { ArrowDown } from "phosphor-react";

interface SensiHeroProps {
  allSensiblogPosts: sensiblogPost[];
  lang: string;
}

const SensiHero = ({ allSensiblogPosts, lang }: SensiHeroProps) => {
  const recentPosts = allSensiblogPosts.slice(0,4);
  return (
    <div className="w-screen mt-28">
        <div className="absolute flex max-w-min flex-row space-x-1 bg-white font-semibold text-sm z-30 py-1 px-2">
          <ArrowDown size={18} color="#1f1a1a" />
          <a>Recientes</a>
        </div>
      <div className="flex shrink-0 snap-x mx-auto snap-mandatory overflow-scroll">
        {recentPosts.map((post) => (
          <HeroItem post={post} lang={lang} />
        ))}
      </div>
    </div>
  );
};

export default SensiHero;
