import { aboutPost } from "../interfaces/posts";
import ReactMarkdown from "react-markdown";
import NavLink from "./navlink";

const Bio = (props: { data: aboutPost; lang: string }) => {
  const content =
    props.lang === "spa"
      ? props.data.contentSpanish
      : props.data.contentEnglish;
  return (
    <ReactMarkdown
      className="bio"
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

export default Bio;
