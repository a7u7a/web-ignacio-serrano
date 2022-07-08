import Head from "next/head";
import { getAbout, getSortedFeedPosts, getAllPostsSlugs } from "../lib/posts";
import { GetStaticProps } from "next";
import { aboutPost, feedPost } from "../interfaces/posts";
import AboutSection from "../components/aboutSection";
import { useState, useEffect } from "react";
import LanguageButton from "../components/languageBtn";
import UpButton from "../components/upBtn";
import Feed from "../components/feed";
import RandomButton from "../components/randomButton";
import CajaRemedio from "../components/cajaRemedio";
import Image from "next/image";
import useMediaQuery from "../lib/media";
import MyFooter from "../components/footer";
import SocialAbout from "../components/socials";

const pageName = "About";

interface AboutProps {
  aboutData: aboutPost[];
  allFeedData: feedPost[];
  allPostsSlugs: string[];
}

const About = ({ aboutData, allFeedData, allPostsSlugs }: AboutProps) => {
  const [lang, setLang] = useState("spa");

  const isSmall = useMediaQuery("(max-width: 768px)");
  const [collapsed, setCollapsed] = useState(isSmall);
  const randomLink = allPostsSlugs[Math.floor(Math.random() * allPostsSlugs.length)];

  useEffect(() => {
    setCollapsed(isSmall ? true : false);
  }, [isSmall]);

  function expandHandle() {
    setCollapsed(!collapsed);
    // go to top
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
        {/* about top buttons */}
        <div className="flex absolute flex-row p-6 justify-end w-1/2 z-50">
          <UpButton color="black" href="/" />
          <LanguageButton onClick={toggleLang} lang={lang} color="black" />
        </div>

        <div
          className={`relative flex flex-col justify-between w-full items-center ${
            collapsed ? "overflow-hidden h-screen" : "overflow-auto h-full"
          } h-max-screen no-scroll-bar`}
        >
          <div className="flex flex-col items-center m-6 md:ml-14 md:mr-14 lg:ml-20 lg:mr-20 lg:max-w-xl">
            <div className="h-64 w-full mt-8 mb-6">
              <CajaRemedio />
            </div>

            {/* Intro */}
            <AboutSection
              className="intro"
              data={aboutData.filter((post) => post.id === "intro")[0]}
              lang={lang}
            />

            <SocialAbout />

            <RandomButton linkTo={randomLink} />

            {/* Bio */}
            <AboutSection
              className="bio"
              data={aboutData.filter((post) => post.id === "bio")[0]}
              lang={lang}
            />

            {/* CV */}
            <div className="mt-0 left-0 w-full">
              <AboutSection
                className="cv"
                data={aboutData.filter((post) => post.id === "cv")[0]}
                lang={lang}
              />
            </div>
          </div>

          <MyFooter color="white" />

          {/* collapse btn */}
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

export const getStaticProps: GetStaticProps = async () => {
  const aboutData = await getAbout();
  const allFeedData = getSortedFeedPosts();
  const allPostsSlugs = getAllPostsSlugs();
  return {
    props: {
      aboutData,
      allFeedData,
      allPostsSlugs
    },
  };
};

export default About;
