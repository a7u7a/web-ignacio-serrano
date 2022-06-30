import { aboutPost } from "../interfaces/posts";
import FromMarkdown from "./postFromMarkdown";

interface AboutSectionProps {
  data: aboutPost;
  lang: string;
  className: string;
}

const AboutSection = ({ data, lang, className }: AboutSectionProps) => {
  const content = lang === "spa" ? data.contentSpanish : data.contentEnglish;
  return <FromMarkdown contentMd={content} className={className} />;
};

export default AboutSection;
