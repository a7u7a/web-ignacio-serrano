import { AboutCollection } from "../models/aboutCollection.models";
import ReactMarkdown from "react-markdown";
import NavLink from "./navlink";

const CV = (props: { data: AboutCollection }) => {
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
      {props.data.contentHtml}
    </ReactMarkdown>
  );
};

export default CV;
