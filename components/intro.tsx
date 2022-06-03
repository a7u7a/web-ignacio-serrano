import { aboutPost } from "../interfaces/posts";
import ReactMarkdown from "react-markdown";
import NavLink from "./navlink";

const Intro = (props: { data: aboutPost, lang: string, className:string  }) => {
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

export default Intro;
