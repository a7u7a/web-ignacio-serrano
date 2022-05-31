import { AboutCollection } from "../models/aboutCollection.models";

const CV: React.FC<{ data: AboutCollection }> = (props: {
  data: AboutCollection;
}) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: props.data.contentHtml }}></div>
  );
};

export default CV;
