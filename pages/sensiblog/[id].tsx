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
import FromMarkdownToSensiblog from "../../components/sensiblog/from-markdown";
import SideGradient from "../../components/side-gradient";
import LanguageButton from "../../components/languageBtn";
import DateEl from "../../components/date";
import UpButton from "../../components/upBtn";
import CategoryTag from "../../components/sensiblog/category-tag";
import RelatedPosts from "../../components/related-posts";

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
    <div className="flex justify-between flex-row h-screen bg-black overflow-x-auto">
      <UpButton color="white" href="/sensiblog" />
      <SideGradient />
      <div className="p-10">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex flex-row justify-between w-80">
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
            <div className="mt-8"></div>
            <CategoryTag label={post.category} />

            {/* Title */}
            <div className="mt-3 text-5xl font-serif text-white">{title}</div>

            {/* Date */}
            <div className="text-sm mt-4">
              <DateEl dateString={post.date} />
            </div>

            {/* Tags */}
            <div className="text-sm mt-4">
              {post.tags.map((tag, i) => (
                <p key={i} className="inline pr-2">
                  {`#${tag}`}
                </p>
              ))}
            </div>

            {/* Related posts */}
            <div className="mt-10 ">
              <RelatedPosts posts={relatedPosts} lang={lang} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <FromMarkdownToSensiblog
          contentMd={content}
          className="flex flex-row w-full pt-12 pb-12"
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
