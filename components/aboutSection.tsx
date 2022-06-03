import { aboutPost } from "../interfaces/posts";
import ReactMarkdown from "react-markdown";
import NavLink from "./navlink";

interface AboutSectionProps {
  data: aboutPost;
  lang: string;
  className: string;
}

const AboutSection = ({data, lang, className}: AboutSectionProps) => {
  const content =
    lang === "spa"
      ? data.contentSpanish
      : data.contentEnglish;
  return (
    <ReactMarkdown
      className={className}
      components={{
        a: ({ node, children }) => {
          return (
            <NavLink
              url={node.properties!.href as string}
              text={children[0] as string}
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default AboutSection;
