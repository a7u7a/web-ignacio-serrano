import { GetStaticProps } from "next";
import { getSortedSensiblogPosts } from "../lib/posts";
import { aboutPost, feedPost, sensiblogPost } from "../interfaces/posts";
import UpButton from "../components/upButton";
import LanguageButton from "../components/LanguageButton";
import { useState, useEffect } from "react";
import Image from "next/image";

interface sensiblogProps {
  allSensiblogPosts: sensiblogPost[];
}

const Sensiblog = ({ allSensiblogPosts }: sensiblogProps) => {
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
            <UpButton />
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
          <button className="pt-6 h-6 text-black text-xl underline-offset-1 tracking-wide underline mr-24">
            Sobre Sensiblog
          </button>
          <div className="p-6 mr-44">
            <LanguageButton onClick={toggleLang} lang={lang} />
          </div>
        </div>
      </div>
      <div className="w-full"></div>
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
