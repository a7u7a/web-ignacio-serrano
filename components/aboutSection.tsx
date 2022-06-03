import { aboutPost } from "../interfaces/posts";
import ReactMarkdown from "react-markdown";
import NavLink from "./navlink";

interface AboutSectionProps {
  data: aboutPost;
  lang: string;
  className: string;
}

const AboutSection = (props: AboutSectionProps) => {
    console.log("spa",props.data.contentSpanish );
    console.log("eng", props.data.contentEnglish);
  const content =
    props.lang === "spa"
      ? props.data.contentSpanish
      : props.data.contentEnglish;
  return (
    <ReactMarkdown
      className={props.className}
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
