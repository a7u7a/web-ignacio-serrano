import { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import { getAllPosibleIds, getPosiblePost } from "../../lib/posts";
import { posiblePost } from "../../interfaces/posts";
import FromMarkdownHorizontal from "../../components/from-markdown-horizontal";
import LanguageButton from "../../components/languageBtn";
import UpButton from "../../components/upBtn";
import FromMarkdown from "../../components/from-markdown";

interface PosiblePostProps {
  post: posiblePost;
}

export default function Post({ post }: PosiblePostProps) {
  console.log("post", post);
  const [lang, setLang] = useState("spa");
  // const [content, setContent] = useState("");
  const content =
    lang === "spa" ? post.contentSpanish : post.descriptionEnglish;
  console.log("lang", lang);
  var peso = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  });

  function toggleLang() {
    if (lang === "spa") {
      setLang("eng");
    } else {
      setLang("spa");
    }
  }

  return (
    <div className="flex justify-between flex-col md:flex-row h-screen  overflow-x-auto">
      <UpButton color="black" href="/posible" />
          <div className="absolute top-0 right-0 p-6">
            <LanguageButton onClick={toggleLang} lang={lang} color="black" />
          </div>
      <div className="absolute p-6">
        <div className="relative flex flex-col w-80">
          <div className="flex flex-col pt-24 pl-8">
            {/* Title */}
            <div className="mt-3 font-light text-3xl w-52">{post.title}</div>
            <div className="flex flex-row space-x-10 mt-6">
              <p className="text-lg">{peso.format(post.price)}</p>
              <button className="text-black rounded bg-verde py-0.5 px-1.5 text-sm font-medium">
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pl-14 pt-80">
        <FromMarkdown contentMd={content} proseClass={"posible-description"} />
      </div>

      <div className="pl-16">
        <FromMarkdownHorizontal
          contentMd={post.photos}
          className="flex flex-col md:flex-row w-full pt-2 px-6 sm:px-8 md:px-10 lg:px-10 md:pt-12 pb-20 md:pb-12"
          proseClass="posible"
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
