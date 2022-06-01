import { AboutCollection } from "../models/aboutCollection.models";

const Intro: React.FC<{ data: AboutCollection }> = (props: {
  data: AboutCollection;
}) => {
  return (
    <div className="font-semibold" dangerouslySetInnerHTML={{ __html: props.data.contentHtml }}></div>
  );
};

export default Intro;
