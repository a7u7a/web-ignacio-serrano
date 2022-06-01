import { AboutCollection } from "../models/aboutCollection.models";

const CV: React.FC<{ data: AboutCollection }> = (props: {
  data: AboutCollection;
}) => {
  return (
    <div className="text-sm flex flex-col space-y-4" dangerouslySetInnerHTML={{ __html: props.data.contentHtml }}></div>
  );
};

export default CV;
