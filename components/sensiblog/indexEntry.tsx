import { sensiblogPost } from "../../interfaces/posts";
import ReactMarkdown from "react-markdown";

interface indexEntryProps {
  postSummary: sensiblogPost;
}

const IndexEntry = ({ postSummary }: indexEntryProps) => {
  return (
    <div className="flex flex-col">
      <div className="font-serif text-xl">{postSummary.title}</div>
      <ReactMarkdown>{postSummary.contentSpanish.slice(0, 100)}</ReactMarkdown>
    </div>
  );
};

export default IndexEntry;
