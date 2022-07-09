import { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getAllPostIds,
  getSensiblogPost,
  getRelatedSensiblogPosts,
} from "../../lib/posts";
import { sensiblogPost } from "../../interfaces/posts";
import FromMarkdownToSensiblog from "../../components/from-markdown-horizontal";
import LanguageButton from "../../components/languageBtn";
import DateEl from "../../components/date";
import UpButton from "../../components/upBtn";
import CategoryTag from "../../components/sensiblog/category-tag";
import RelatedPosts from "../../components/sensiblog/related-posts";

interface SensiblogPostProps {
  post: sensiblogPost;
  relatedPosts: sensiblogPost[];
}

export default function Post({ post, relatedPosts }: SensiblogPostProps) {
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
    <div className="flex justify-between flex-col md:flex-row h-screen bg-black overflow-x-auto">
      <UpButton color="white" href="/sensiblog" />
      <div className="fixed inset-x-0 bottom-0 md:left-auto md:inset-y-0 md:right-0 h-20 md:h-screen w-screen md:w-20 z-20 bg-gradient-to-t md:bg-gradient-to-l from-amarillo" />

      <div className="p-6 sm:p-8 md:p-10">
        <div className="flex flex-col">
          {/* Header */}
          <div className="relative flex flex-row justify-center md:justify-between w-full md:w-80">
            <div className="h-20 w-48 relative cursor-pointer mt-6">
              <Image
                objectFit="contain"
                src={"/images/sensiblog.png"}
                layout="fill"
              />
            </div>
            <div className="absolute top-0 right-0 md:top-auto md:right-auto md:static">
              <LanguageButton onClick={toggleLang} lang={lang} color="white" />
            </div>
          </div>

          <div className="text-white">
            <div className="mt-8"></div>
            <CategoryTag label={post.category} />

            {/* Title */}
            <div className="mt-3 text-5xl font-serif text-white">{title}</div>

            {/* Date */}
            <div className="text-base mt-4">
              <DateEl dateString={post.date} />
            </div>

            {/* Tags */}
            <div className="text-base mt-4">
              {post.tags.map((tag, i) => (
                <p key={i} className="inline pr-2">
                  {`#${tag}`}
                </p>
              ))}
            </div>

            {/* Related posts */}
            <div className="mt-10 hidden md:block">
              <RelatedPosts relatedPosts={relatedPosts} lang={lang} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <FromMarkdownToSensiblog
          contentMd={content}
          className="flex flex-col md:flex-row w-full pt-2 px-6 sm:px-8 md:px-10 lg:px-10 md:pt-12 pb-20 md:pb-12"
          proseClass="sensiblog"
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
  const relatedPosts = getRelatedSensiblogPosts(post.tags, post.id);
  return {
    props: {
      post,
      relatedPosts,
    },
  };
};
