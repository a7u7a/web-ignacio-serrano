import { sensiblogPost } from "../../interfaces/posts";
import { remark } from "remark";
import { useState, useEffect } from "react";
import html from "remark-html";
import Image from "next/image";

interface indexEntryProps {
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

const IndexEntry = ({ post }: indexEntryProps) => {
  const [snippet, setSnippet] = useState("");

  useEffect(() => {
    const processContent = async () => {
      // parse post content to html
      const content = await remark().use(html).process(post.contentSpanish);
      // strip html and get only text
      setSnippet(strip(content.toString()).slice(0, 120) + "..");
    };
    processContent();
    console.log(snippet);
  }, []);

  return (
    <div className="flex flex-row h-32">
      <div className="w-32 relative">
        <Image objectFit="cover" src={post.thumbnail} layout="fill" />
      </div>
      <div className="flex flex-col w-64">
        <div className="font-serif text-xl">{post.title}</div>
        <div className="text-xs">{snippet}</div>
      </div>
    </div>
  );
};

export default IndexEntry;
