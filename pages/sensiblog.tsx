import { GetStaticProps } from "next";
import { getSortedSensiblogPosts } from "../lib/posts";
import { sensiblogPost } from "../interfaces/posts";
import UpButton from "../components/upButton";
import LanguageButton from "../components/languageButton";
import { useState, useEffect } from "react";
import Image from "next/image";
import IndexEntry from "../components/sensiblog/indexEntry";

interface sensiblogProps {
  allSensiblogPosts: sensiblogPost[];
}

function getCategories(allPosts: sensiblogPost[]) {
  const _ = allPosts.map((post) => {
    return post.category;
  });
  return [...new Set(_)]; // remove duplicates
}

const Sensiblog = ({ allSensiblogPosts }: sensiblogProps) => {
  const categories = getCategories(allSensiblogPosts);
  const [lang, setLang] = useState("spa");

  function toggleLang() {
    if (lang === "spa") {
      setLang("eng");
    } else {
      setLang("spa");
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <div className="flex flex-row justify-between fixed w-full z-50">
        <div className="flex flex-row">
          <div className="pt-6 px-6">
            <UpButton color="white" />
          </div>
          <div className="h-32 w-56 relative">
            <Image
              objectFit="contain"
              src={"/images/sensiblog.png"}
              layout="fill"
            />
          </div>
        </div>
        <div className="flex flex-row">
          <button className="pt-6 h-6 text-black text-xl underline-offset-1 tracking-wide underline mr-24 hover:text-violeta">
            Sobre Sensiblog
          </button>
          <div className="p-6 mr-44">
            <LanguageButton onClick={toggleLang} lang={lang} />
          </div>
        </div>
      </div>
      <div className="mt-32 flex flex-col w-full">
        {categories.map((category) => (
          <div className="flex flex-row h-32  overflow-x-scroll" key={category}>
            <div className="flex items-center text-3xl font-serif h-32 p-6">
              {category + " →"}
            </div>
            {allSensiblogPosts
              .filter((post) => {
                return post.category === category;
              })
              .map((post) => (
                <IndexEntry post={post} key={post.id} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allSensiblogPosts = getSortedSensiblogPosts();
  return {
    props: {
      allSensiblogPosts,
    },
  };
};

export default Sensiblog;
