import { aboutPost } from "../interfaces/posts";
import ReactMarkdown from "react-markdown";
import NavLink from "./navlink";

const CV = (props: { data: aboutPost }) => {
  return (
    <ReactMarkdown
    className="cv"
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
      {props.data.contentSpanish}
    </ReactMarkdown>
  );
};

export default CV;
