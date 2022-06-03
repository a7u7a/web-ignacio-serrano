import Head from "next/head";
import { getAbout } from "../lib/posts";
import Link from "next/link";
import { GetStaticProps } from "next";
import { aboutPost } from "../interfaces/posts";
import AboutSection from "../components/aboutSection";
import { ArrowElbowLeftUp } from "phosphor-react";
import { useState } from "react";
import LanguageButton from "../components/LanguageButton";
import UpButton from "../components/upButton";

const pageName = "About";

export default function About({ allPostsData }: { allPostsData: aboutPost[] }) {
  const [lang, setLang] = useState("spa");

  function toggleLang() {
    if (lang === "spa") {
      setLang("eng");
    } else {
      setLang("spa");
    }
    console.log("lang", lang);
  }

  //console.log("allPostsData[0]", allPostsData[0].contentHtml);
  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/2">
        <div className="flex flex-row p-6 justify-between fixed w-1/2">
          <UpButton />
          <LanguageButton onClick={toggleLang} lang={lang} />
        </div>
        <div className="h-full overflow-auto">
          <div className="flex flex-col m-6 sm:m-24 space-y-10">
            <AboutSection
              className="intro"
              data={allPostsData.filter((post) => post.id === "intro")[0]}
              lang={lang}
            ></AboutSection>
            <AboutSection
              className="bio"
              data={allPostsData.filter((post) => post.id === "bio")[0]}
              lang={lang}
            ></AboutSection>
            <AboutSection
              className="cv"
              data={allPostsData.filter((post) => post.id === "cv")[0]}
              lang={lang}
            ></AboutSection>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <button className="fixed w-1/2 mt-16 mb-16 object-center rotate-45 text-center text-3xl">
          Feed
        </button>
        <div className="h-full pb-12 overflow-auto">
          <div className="pt-44 flex flex-col space-y-12">
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
            <p className="text-center text-2xl">
              Actividad: Revista Arte Actual Madrid
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// fetch post data from 'about' collection folder
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getAbout("about");
  return {
    props: {
      allPostsData,
    },
  };
};
