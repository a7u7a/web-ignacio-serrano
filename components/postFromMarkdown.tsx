import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Image from "next/image";

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
        blockquote: ({ node, ...props }) => {
          if (node.properties && node.properties.id === "textOnImage") {
            const text = (node.children[0] as ChildProps).value;
            const src = node.properties.src as string;
            const alt = node.properties.alt as string;
            return (
              <div className="flex w-full h-96 relative">
                <Image objectFit="contain" src={src} layout="fill" alt={alt} />
                <div className="absolute flex w-full h-full m-2">
                  <p className="text-white">{text}</p>
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
