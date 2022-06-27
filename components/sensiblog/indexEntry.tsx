import { sensiblogPost } from "../../interfaces/posts";
import { remark } from "remark";
import { useState, useEffect } from "react";
import html from "remark-html";
import Image from "next/image";
import DateEl from "../date";

interface IndexEntryProps {
  post: sensiblogPost;
  lang: string;
}

/* 
Here we get the first few characters to preview the post. 
Text stripped of any html/markdown contents
*/

function strip(html: string) {
  // from https://stackoverflow.com/questions/822452/strip-html-from-text-javascript/47140708#47140708
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

const IndexEntry = ({ post, lang }: IndexEntryProps) => {
  const [snippet, setSnippet] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const processContent = async () => {
      const _ = lang === "spa" ? post.contentSpanish : post.contentEnglish;

      // parse post content to html
      const content = await remark().use(html).process(_);
      // strip html and get only text, trim to only the first chars
      setSnippet(strip(content.toString()).slice(0, 160) + "..");
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
        <div className="mt-3 text-xs text-zinc-400">{snippet}</div>
      </div>
    </div>
  );
};

export default IndexEntry;
