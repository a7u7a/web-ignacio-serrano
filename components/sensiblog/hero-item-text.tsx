import { sensiblogPost } from "../../interfaces/posts";
import { useState, useEffect } from "react";
import { remark } from "remark";
import DateEl from "../date";
import { strip } from "../../lib/utils";
import html from "remark-html";

interface HeroItemTextProps {
    post: sensiblogPost;
    lang:string
  }
  
  const HeroItemText = ({ post,lang }: HeroItemTextProps) => {
    const [snippet, setSnippet] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const processContent = async () => {
      const _ = lang === "spa" ? post.contentSpanish : post.contentEnglish;
      const content = await remark().use(html).process(_);
      setSnippet(strip(content.toString()));
      setTitle(lang === "spa" ? post.title : post.title_eng);
    };
    processContent();
  }, [lang]);

    return (<div className="absolute z-30 text-white pt-10 sm:pt-12 md:pt-16 pl-4 sm:pl-8 md:pl-12 pr-8 pb-4">
    <div className="flex flex-col">
      <div className="text-sm max-w-min px-1 rounded font-bold text-zinc-800 mt-1 md:mt-2 bg-slate-200">
        {post.category}
      </div>
      <div className=" font-serif mt-2 text-xl sm:text-xl md:text-4xl lg:text-6xl">
        {title}
      </div>
      <DateEl dateString={post.date} className="text-xs sm:text-xs md:text-sm text-white pt-1 md:pt-2 " />
      <p className="mt-2 md:mt-3 w-2/3 text-xs sm:text-sm md:text-base line-clamp-3">
        {snippet}
      </p>
    </div>
  </div>);
  };
  export default HeroItemText;
  