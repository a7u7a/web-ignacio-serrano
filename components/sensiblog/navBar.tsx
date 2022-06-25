import Image from "next/image";
import UpButton from "../upBtn";
import LanguageButton from "../languageBtn";
import SensiblogModal from "../sensiblog/modal";
import { sensiblogPost, modalContent } from "../../interfaces/posts";
import { useState } from "react";

interface SensiblogNavbarProps {
  toggleFunc: () => void;
  lang: string;
  modalContent: modalContent;
}

const SensiblogNavbar = ({
  toggleFunc,
  lang,
  modalContent,
}: SensiblogNavbarProps) => {
  const [visible, setVisibility] = useState(false);
  return (
    <div className="flex flex-row justify-between fixed w-full z-40 bg-black">
      <SensiblogModal
        content={modalContent}
        visible={visible}
        toggleVisible={setVisibility}
      />
      <div className="flex flex-row">
        <div className="pt-6 px-6">
          <UpButton color="white" />
        </div>
        <div className="h-28 w-52 mt-3 relative">
          <Image
            objectFit="contain"
            src={"/images/sensiblog.png"}
            layout="fill"
          />
        </div>
      </div>
      <div className="flex flex-row">
        <button
          onClick={() => setVisibility(true)}
          className="pt-6 h-6 text-xl underline-offset-1 tracking-wide underline mr-24 hover:text-violeta text-white"
        >
          Sobre Sensiblog
        </button>
        <div className="p-6 mr-44">
          <LanguageButton onClick={toggleFunc} lang={lang} color="white" />
        </div>
      </div>
    </div>
  );
};

export default SensiblogNavbar;
