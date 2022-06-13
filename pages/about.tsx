import Head from "next/head";
import { getAbout, getSortedFeedPosts } from "../lib/posts";
import { GetStaticProps } from "next";
import { aboutPost, feedPost } from "../interfaces/posts";
import AboutSection from "../components/aboutSection";
import { useState, useEffect } from "react";
import LanguageButton from "../components/languageButton";
import UpButton from "../components/upButton";
import Feed from "../components/feed";
import RandomButton from "../components/randomButton";
import CajaRemedio from "../components/cajaRemedio";
import Image from "next/image";
import useMediaQuery from "../lib/media";

const pageName = "About";

interface AboutProps {
  aboutData: aboutPost[];
  allFeedData: feedPost[];
}

const About = ({ aboutData, allFeedData }: AboutProps) => {
  const [lang, setLang] = useState("spa");

  const isSmall = useMediaQuery("(max-width: 768px)");
  const [collapsed, setCollapsed] = useState(isSmall);

  useEffect(() => {
    setCollapsed(isSmall ? true : false);
  }, [isSmall]);

  function expandHandle() {
    setCollapsed(!collapsed);

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  function toggleLang() {
    if (lang === "spa") {
      setLang("eng");
    } else {
      setLang("spa");
    }
  }
  return (
    <div className="flex flex-col md:flex-row md:h-screen">
      <div className="w-full md:w-1/2">
        <div className="flex flex-row p-6 justify-between fixed w-full md:w-1/2 z-50">
          <UpButton color="black" />
          <LanguageButton onClick={toggleLang} lang={lang} color="black" />
        </div>
        <div
          // className="relative h-96 overflow-hidden md:overflow-auto h-max-96 md:h-full"
          className={`relative ${
            collapsed ? "overflow-hidden h-screen" : "overflow-auto h-full"
          } h-max-screen `}
        >
          <div className="flex flex-col m-6 md:ml-8 md:mr-8 lg:ml-24 lg:mr-24 space-y-10">
            <CajaRemedio />

            <AboutSection
              className="intro"
              data={aboutData.filter((post) => post.id === "intro")[0]}
              lang={lang}
            />
            <AboutSection
              className="bio"
              data={aboutData.filter((post) => post.id === "bio")[0]}
              lang={lang}
            />
            <RandomButton />
            <div>
              <div className="w-3/12 mb-4">
                <Image
                  height={100}
                  width={100 * 1.09}
                  src={"/images/cv.png"}
                ></Image>
              </div>
              <AboutSection
                className="cv"
                data={aboutData.filter((post) => post.id === "cv")[0]}
                lang={lang}
              />
            </div>
          </div>
          <div
            className={`${
              collapsed ? "absolute" : "fixed"
            } flex flex-col bottom-0 text-center inset-x-0 md:invisible items-center bg-gradient-to-t from-indigo-500`}
          >
            <button
              onClick={expandHandle}
              className="bg-white border rounded border-rojo px-2 mb-4 mt-16 text-rojo"
            >
              {collapsed ? "Expandir" : "Contraer"}
            </button>
          </div>
        </div>
      </div>
      <Feed feedPosts={allFeedData} />
    </div>
  );
};

// fetch post data from 'about' collection folder
export const getStaticProps: GetStaticProps = async () => {
  const aboutData = await getAbout();
  const allFeedData = getSortedFeedPosts();
  return {
    props: {
      aboutData,
      allFeedData,
    },
  };
};

export default About;
