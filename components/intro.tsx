import { AboutCollection } from "../models/aboutCollection.models";

const Intro: React.FC<{ data: AboutCollection }> = (props: {
  data: AboutCollection;
}) => {
  return (
    <div className="font-semibold text-center" dangerouslySetInnerHTML={{ __html: props.data.contentHtml }}></div>
  );
};

export default Intro;
