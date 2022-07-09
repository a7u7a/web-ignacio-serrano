import { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import {
  getAllPosibleIds,
  getPosiblePost,
} from "../../lib/posts";
import { posiblePost } from "../../interfaces/posts";
import FromMarkdownHorizontal from "../../components/from-markdown-horizontal";
import LanguageButton from "../../components/languageBtn";
import UpButton from "../../components/upBtn";

interface PosiblePostProps {
  post: posiblePost;
}

export default function Post({ post }: PosiblePostProps) {
  const [lang, setLang] = useState("spa");
  const content = lang === "spa" ? post.contentSpanish : post.contentEnglish;

  function toggleLang() {
    if (lang === "spa") {
      setLang("eng");
    } else {
      setLang("spa");
    }
  }

  return (
    <div className="flex justify-between flex-col md:flex-row h-screen bg-black overflow-x-auto">
      <UpButton color="white" href="/posible" />
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

            {/* Title */}
            <div className="mt-3 text-5xl font-serif text-white">
              {post.title}
            </div>
          </div>
        </div>
      </div>

      <div>
        <FromMarkdownHorizontal
          contentMd={content}
          className="flex flex-col md:flex-row w-full pt-2 px-6 sm:px-8 md:px-10 lg:px-10 md:pt-12 pb-20 md:pb-12"
          proseClass="sensiblog"
        />
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPosibleIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPosiblePost(params!.id as string);

  return {
    props: {
      post,
    },
  };
};
