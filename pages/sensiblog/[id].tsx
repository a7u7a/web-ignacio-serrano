import { useState, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { getAllPostIds, getSensiblogPost } from "../../lib/posts";
import { sensiblogPost } from "../../interfaces/posts";
import ReactMarkdown from "react-markdown";
import FromMarkdownToSensiblog from "../../components/sensiblog/from-markdown";
import SideGradient from "../../components/side-gradient";
import Image from "next/image";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import LanguageButton from "../../components/languageBtn";
import DateEl from "../../components/date";

interface SensiblogPostProps {
  post: sensiblogPost;
}
interface ChildProps {
  value: string;
}

export default function Post({ post }: SensiblogPostProps) {
  const [lang, setLang] = useState("spa");
  const content = lang === "spa" ? post.contentSpanish : post.contentEnglish;
  const title = lang === "spa" ? post.title : post.title_eng;

  function toggleLang() {
    if (lang === "spa") {
      setLang("eng");
    } else {
      setLang("spa");
    }
  }

  return (
    <div className="flex justify-between flex-row h-screen bg-black overflow-x-auto">
       <div className="pl-12 pt-12 pb-12">
        <SideGradient />
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex flex-row justify-between w-96">
            <Link href={"/sensiblog"}>
              <div className="h-20 w-48 relative cursor-pointer">
                <Image
                  objectFit="contain"
                  src={"/images/sensiblog.png"}
                  layout="fill"
                />
              </div>
            </Link>
            <LanguageButton onClick={toggleLang} lang={lang} color="white" />
          </div>

          <div className="text-white">
            {/* Title */}
            <div className="mt-12 text-5xl font-serif text-white">{title}</div>

            {/* Date */}
            <div className="text-sm mt-8">
              <DateEl dateString={post.date} />
            </div>

            {/* Tags */}
            <div className="mt-4">
              {post.tags.map((tag) => (
                <p key={tag} className="inline mr-2">{`#${tag}`}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <FromMarkdownToSensiblog
          contentMd={content}
          className="flex flex-row w-full space-x-12 p-12 "
        />
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getSensiblogPost(params!.id as string);
  return {
    props: {
      post,
    },
  };
};
