import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// Almost identical to components/from-markdown.tsx but deals with column divs for horizontal scrolling layout

interface FromMarkdownProps {
  contentMd: string;
  className: string;
}

interface ChildProps {
  value: string;
}

const FromMarkdown = ({ contentMd, className }: FromMarkdownProps) => {
  return (
    <ReactMarkdown
      children={contentMd}
      className={className}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        div: ({ node, ...props }) => {
          console.log("node", node);
          return <div {...props} className="sensiblog" />;
        },
        iframe: ({ node, ...props }) => {
          // used for youtube videos
          return <iframe {...props} className="aspect-[16/9] w-full" />;
        },
        blockquote: ({ node, ...props }) => {
          if (node.properties && node.properties.id === "textOnImage") {
            const text = (node.children[0] as ChildProps).value;
            const src = node.properties.src as string;
            const alt = node.properties.alt as string;
            return (
              <div className="w-full relative">
                <img
                  alt={alt}
                  src={src}
                  className="w-full object-contain"
                />
                <div className="absolute w-full h-full top-0 left-0 p-4 overflow-auto">
                  <span className="text-white leading-snug text-base inline py-0.5 px-0.5 bg-black">
                    {text}
                  </span>
                </div>
              </div>
            );
          } else {
            return <blockquote {...props} />;
          }
        },
      }}
    />
  );
};

export default FromMarkdown;
