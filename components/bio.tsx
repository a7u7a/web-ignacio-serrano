import { AboutCollection } from "../models/aboutCollection.models";

const Bio: React.FC<{ data: AboutCollection }> = (props: {
  data: AboutCollection;
}) => {
  return (
    <div
      className="space-y-4"
      dangerouslySetInnerHTML={{ __html: props.data.contentHtml }}
    ></div>
  );
};

export default Bio;
