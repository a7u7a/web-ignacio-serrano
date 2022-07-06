import { useState, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { getAllPostIds, getSensiblogPost } from "../../lib/posts";
import { sensiblogPost } from "../../interfaces/posts";
import ReactMarkdown from "react-markdown";
import FromMarkdownToSensiblog from "../../components/sensiblog/from-markdown";

import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

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
    <div className="flex justify-between flex-row h-full bg-black">
      <div>
        <FromMarkdownToSensiblog contentMd={content} className="flex flex-row p-12 space-x-12 overflow-x-auto" />
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
