import { GetStaticProps } from "next";
import { getSortedSensiblogPosts, getModalContents } from "../lib/posts";
import { sensiblogPost, modalContent } from "../interfaces/posts";
import { useState } from "react";
import SensiblogNavbar from "../components/sensiblog/navBar";
import MyFooter from "../components/footer";
import SensiCatalog from "../components/sensiblog/sensilog";
import SensiHero from "../components/sensiblog/hero";
import SideGradient from "../components/side-gradient";

interface sensiblogProps {
  allSensiblogPosts: sensiblogPost[];
  modalContents: modalContent;
}

const Sensiblog = ({ allSensiblogPosts, modalContents }: sensiblogProps) => {
  const [lang, setLang] = useState("spa");

  function toggleLang() {
    if (lang === "spa") {
      setLang("eng");
    } else {
      setLang("spa");
    }
  }

  return (
    <div className="flex flex-col justify-between bg-black">
      <div>
        <SensiblogNavbar
          lang={lang}
          toggleFunc={toggleLang}
          modalContent={modalContents}
        />
        <SensiHero allSensiblogPosts={allSensiblogPosts} lang={lang} />
        <SensiCatalog allSensiblogPosts={allSensiblogPosts} lang={lang} />
        <SideGradient />
      </div>
      <MyFooter color="black" />
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
