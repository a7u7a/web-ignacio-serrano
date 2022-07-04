import { useState, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getAllPostIds, getSensiblogPost } from "../../lib/posts";
import { sensiblogPost } from "../../interfaces/posts";
import LanguageButton from "../../components/languageBtn";
import DateEl from "../../components/date";
import SideGradient from "../../components/side-gradient";
// import FromMarkdownTest from "../../components/postFromMarkdown-test";
import FromMarkdown from "../../components/postFromMarkdown";

interface SensiblogPostProps {
  post: sensiblogPost;
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
    <div className="flex flex-col md:flex-row h-screen w-screen pl-12 py-12 bg-black overflow-x-auto">
      <SideGradient />
      <div className="flex flex-col w-2/6 max-w-lg mr-12">
        {/* Header */}
        <div className="flex flex-row justify-between w-full">
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

      <div className="">

        <FromMarkdown contentMd={content} className="sensiblog" />
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
