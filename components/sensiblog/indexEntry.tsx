import { sensiblogPost } from "../../interfaces/posts";
import { remark } from "remark";
import { useState, useEffect } from "react";
import html from "remark-html";
import Image from "next/image";

interface IndexEntryProps {
  post: sensiblogPost;
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

const IndexEntry = ({ post }: IndexEntryProps) => {
  const [snippet, setSnippet] = useState("");

  useEffect(() => {
    const processContent = async () => {
      // parse post content to html
      const content = await remark().use(html).process(post.contentSpanish);
      // strip html and get only text
      setSnippet(strip(content.toString()).slice(0, 160) + "..");
    };
    processContent();
    
  }, []);

  return (
    <div className="flex flex-row h-40 cursor-pointer">
      <div className="w-40 relative">
        <Image objectFit="cover" src={post.thumbnail} layout="fill" />
      </div>
      <div className="flex flex-col w-64 py-1 pl-3 pr-2 ">
        <div className="font-serif text-xl text-zinc-200">{post.title}</div>
        <div className="mt-2 text-xs text-zinc-400">{snippet}</div>
      </div>
    </div>
  );
};

export default IndexEntry;
