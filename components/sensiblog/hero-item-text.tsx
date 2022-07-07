import { sensiblogPost } from "../../interfaces/posts";
import { useState, useEffect } from "react";
import { remark } from "remark";
import DateEl from "../date";
import { strip } from "../../lib/utils";
import html from "remark-html";
import Link from "next/link";
import CategoryTag from "./category-tag";

interface HeroItemTextProps {
  post: sensiblogPost;
  lang: string;
}

const HeroItemText = ({ post, lang }: HeroItemTextProps) => {
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

  return (
    <div className="absolute z-30 text-white pt-10 sm:pt-12 md:pt-16 pl-4 sm:pl-8 md:pl-12 pr-8 pb-4">
      <Link href={`/sensiblog/${post.id}`}>
        <div className="flex flex-col cursor-pointer">
          <CategoryTag label={post.category} />
          <div className=" font-serif mt-2 text-xl sm:text-xl md:text-4xl lg:text-6xl">
            {title}
          </div>
          <DateEl
            dateString={post.date}
            className="text-xs sm:text-xs md:text-sm text-white pt-1 md:pt-2"
          />
          <p className="mt-2 md:mt-3 w-5/6 text-xs sm:text-sm md:text-sm lg:text-base line-clamp-5 md:line-clamp-3">
            {snippet}
          </p>
        </div>
      </Link>
    </div>
  );
};
export default HeroItemText;
