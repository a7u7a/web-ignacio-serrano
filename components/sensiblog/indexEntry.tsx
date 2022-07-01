import { sensiblogPost } from "../../interfaces/posts";
import { remark } from "remark";
import { useState, useEffect } from "react";
import html from "remark-html";
import Image from "next/image";
import DateEl from "../date";
import { strip } from "../../lib/utils";

interface IndexEntryProps {
  post: sensiblogPost;
  lang: string;
}

/* 
Here we get the first few characters to preview the post. 
*/

const IndexEntry = ({ post, lang }: IndexEntryProps) => {
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
    <div className="flex flex-row h-48 cursor-pointer hover:bg-gray-800">
      <div className="w-48 relative">
        <Image objectFit="cover" src={post.thumbnail} layout="fill" />
      </div>
      <div className="flex flex-col w-64 py-1 pl-3 pr-2 ">
        <div className="font-serif text-xl text-zinc-200">{title}</div>
        <DateEl dateString={post.date} className="text-xs text-zinc-300 mt-1" />
        <div className="mt-3 text-xs text-zinc-400 line-clamp-4">{snippet}</div>
      </div>
    </div>
  );
};

export default IndexEntry;
