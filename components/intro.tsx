import { AboutCollection } from "../models/aboutCollection.models";

const Intro: React.FC<{ data: AboutCollection }> = (props: {
  data: AboutCollection;
}) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: props.data.contentHtml }}></div>
  );
};

export default Intro;
