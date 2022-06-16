import { GetStaticProps } from "next";
import { getSortedSensiblogPosts, getModalContents } from "../lib/posts";
import { sensiblogPost, modalContent } from "../interfaces/posts";
import { useState, useEffect } from "react";
import IndexEntry from "../components/sensiblog/indexEntry";
import SensiblogNavbar from "../components/sensiblog/navBar";
import MyFooter from "../components/footer";

interface sensiblogProps {
  allSensiblogPosts: sensiblogPost[];
  modalContents: modalContent;
}

function getCategories(allPosts: sensiblogPost[]) {
  const _ = allPosts.map((post) => {
    return post.category;
  });
  return [...new Set(_)]; // remove duplicates
}

const Sensiblog = ({ allSensiblogPosts, modalContents }: sensiblogProps) => {
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
    <div className="flex flex-col justify-between h-screen bg-black">
      <div className="bg-black">
        <SensiblogNavbar
          lang={lang}
          toggleFunc={toggleLang}
          modalContent={modalContents}
        />
        <div className="fixed inset-y-0 right-0 w-44 z-50 bg-gradient-to-l from-amarillo "></div>
        <div className="mt-32 flex flex-col w-full space-y-3 mb-3">
          {categories.map((category) => (
            <div
              className="flex flex-row h-40 overflow-x-scroll space-x-4 pr-64"
              key={category}
            >
              <div className="sticky left-0 text-3xl font-serif h-40 p-6 text-white bg-black z-30 ">
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
      <MyFooter />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allSensiblogPosts = getSortedSensiblogPosts();
  const modalContents = getModalContents("about-sensiblog");
  return {
    props: {
      allSensiblogPosts,
      modalContents,
    },
  };
};

export default Sensiblog;
