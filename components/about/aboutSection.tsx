import { aboutPost } from "../../interfaces/posts";
import FromMarkdown from "../from-markdown";

interface AboutSectionProps {
  data: aboutPost;
  lang: string;
  className: string;
}

const AboutSection = ({ data, lang, className }: AboutSectionProps) => {
  const content = lang === "spa" ? data.contentSpanish : data.contentEnglish;
  return <FromMarkdown contentMd={content} proseClass={className} />;
};

export default AboutSection;
