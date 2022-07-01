import Image from "next/image";
import { sensiblogPost } from "../../interfaces/posts";
import HeroItem from "./hero-item";

interface SensiHeroProps {
  allSensiblogPosts: sensiblogPost[];
  lang: string;
}

const SensiHero = ({ allSensiblogPosts, lang }: SensiHeroProps) => {
  const recentPosts = allSensiblogPosts.slice(-4);
  return (
    <div className="w-screen mt-28">
      <div className="flex shrink-0 snap-x mx-auto snap-mandatory overflow-scroll">
        <HeroItem imgSrc="/uploads/screen-shot-2021-12-24-at-16.32.48.png" />
        <HeroItem imgSrc="/uploads/screen-shot-2022-05-25-at-20.31.07.png" />
        <HeroItem imgSrc="/uploads/screen-shot-2021-12-24-at-16.32.48.png" />
        <HeroItem imgSrc="/uploads/screen-shot-2022-05-05-at-15.55.04.png" />
      </div>
    </div>
  );
};

export default SensiHero;
