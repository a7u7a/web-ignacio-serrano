import Image from "next/image";
import { sensiblogPost } from "../../interfaces/posts";
import { useState, useEffect } from "react";
import { remark } from "remark";
import html from "remark-html";
import { strip } from "../../lib/utils";
import DateEl from "../date";

interface HeroItemProps {
  post: sensiblogPost;
  lang: string;
}

const HeroItem = ({ post, lang }: HeroItemProps) => {
  const [snippet, setSnippet] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const processContent = async () => {
      const _ = lang === "spa" ? post.contentSpanish : post.contentEnglish;
      const content = await remark().use(html).process(_);
      setSnippet(strip(content.toString()).slice(0, 160) + "..");
      setTitle(lang === "spa" ? post.title : post.title_eng);
    };
    processContent();
  }, [lang]);

  return (
    <div className="relative w-4/6 shrink-0 snap-start">
      <div className="absolute z-30 text-white pt-16 p-12">
        <div className="flex flex-col">
          <div className="text-sm max-w-min px-1 rounded font-bold text-zinc-800 mt-2 bg-slate-200">
            {post.category}
          </div>
          <div className="text-6xl font-serif mt-2">{title}</div>
          <DateEl
            dateString={post.date}
            className="text-sm text-white pt-2"
          />
          <div className="mt-3 w-2/3">{snippet}</div>
        </div>
      </div>
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
