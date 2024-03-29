import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Almost identical to components/from-markdown.tsx but deals with column divs for horizontal scrolling layout

interface FromMarkdownProps {
  contentMd: string;
  className: string;
  proseClass: string;
}

interface ChildProps {
  value: string;
}

const FromMarkdownHorizontal = ({
  contentMd,
  className,
  proseClass,
}: FromMarkdownProps) => {
  return (
    <ReactMarkdown
      children={contentMd}
      className={className}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        div: ({ node, ...props }) => {
          return <div {...props} className={proseClass} />;
        },
        iframe: ({ node, ...props }) => {
          // used for youtube videos
          return (
            <iframe
              {...props}
              className="aspect-[16/9] w-full h-auto md:h-80 pt-0 mb-4"
            />
          );
        },
        blockquote: ({ node, ...props }) => {
          if (node.properties && node.properties.id === "textOnImage") {
            const text = (node.children[0] as ChildProps).value;
            const src = node.properties.src as string;
            const alt = node.properties.alt as string;
            return (
              <div className="w-full relative">
                <img alt={alt} src={src} className="w-full object-cover" />
                <div className="absolute w-full h-full top-0 left-0 p-2 md:p-4 overflow-auto">
                  <span className="text-white text-sm md:text-base leading-snug inline py-0.5 px-0.5 bg-black">
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

export default FromMarkdownHorizontal;
