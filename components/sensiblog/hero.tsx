import Image from "next/image";
import { sensiblogPost } from "../../interfaces/posts";
import HeroItem from "./hero-item";
import { ArrowDown } from "phosphor-react";
import SectionTab from "./section-tab"

interface SensiHeroProps {
  allSensiblogPosts: sensiblogPost[];
  lang: string;
}

const SensiHero = ({ allSensiblogPosts, lang }: SensiHeroProps) => {
  const recentPosts = allSensiblogPosts.slice(0,4);
  return (
    <div className="w-screen">
      <SectionTab tabText="Recientes"/>
      <div className="flex shrink-0 snap-x mx-auto snap-mandatory overflow-scroll">
        {recentPosts.map((post) => (
          <HeroItem post={post} lang={lang} key={post.id}/>
        ))}
      </div>
    </div>
  );
};

export default SensiHero;
