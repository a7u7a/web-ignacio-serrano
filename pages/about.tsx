import Head from "next/head";
import { getAbout, getSortedFeedPosts } from "../lib/posts";
import { GetStaticProps } from "next";
import { aboutPost, feedPost } from "../interfaces/posts";
import AboutSection from "../components/aboutSection";
import { useState } from "react";
import LanguageButton from "../components/LanguageButton";
import UpButton from "../components/upButton";
import Feed from "../components/feed";
import RandomButton from "../components/randomButton";
import CajaRemedio from "../components/cajaRemedio";
import Image from "next/image";

const pageName = "About";

interface AboutProps {
  aboutData: aboutPost[];
  allFeedData: feedPost[];
}

const About = ({ aboutData, allFeedData }: AboutProps) => {
  const [lang, setLang] = useState("spa");

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
          <UpButton />
          <LanguageButton onClick={toggleLang} lang={lang} />
        </div>
        <div className="h-full overflow-auto">
          <div className="flex flex-col m-6 lg:ml-24 lg:mr-24 space-y-10">
            {/* <CajaRemedio /> */}

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
        </div>
      </div>
      <Feed feedData={allFeedData} />
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
