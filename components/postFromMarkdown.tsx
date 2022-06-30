import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface FromMarkdownProps {
  contentMd: string;
  className: string;
}

interface ChildProps {
  value: string;
}

const useResize = (myRef: React.RefObject<HTMLDivElement>) => {
  const getWidth = useCallback(() => myRef?.current?.offsetWidth, [myRef]);

  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      setWidth(getWidth());
      console.log("resize", width);
    };

    if (myRef.current) {
      setWidth(getWidth());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef, getWidth]);

  return width && width > 25 ? width - 25 : width;
};

const FromMarkdown = ({ contentMd, className }: FromMarkdownProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const maxWidth = useResize(divRef);
  return (
    <div ref={divRef}>
      <ReactMarkdown
        children={contentMd}
        className={className}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          blockquote: ({ node, ...props }) => {
            if (node.properties && node.properties.id === "textOnImage") {
              const text = (node.children[0] as ChildProps).value;
              const src = node.properties.src as string;
              const alt = node.properties.alt as string;
              return (
                <div className="w-full relative">
                  <img alt={alt} src={src} className="w-full object-contain" />
                  <div className="absolute w-full h-full top-0 left-0 p-4 overflow-auto">
                    <span className="text-white leading-snug text-lg inline py-0.5 px-0.5 bg-black ">
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
    </div>
  );
};

export default FromMarkdown;
