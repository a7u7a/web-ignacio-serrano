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
      <FromMarkdown contentMd={content} className="sensiblog" />
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
