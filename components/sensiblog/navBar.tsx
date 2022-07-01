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
    <div className="flex flex-row h-28 justify-between fixed w-full z-40 bg-black">
      <SensiblogModal
        content={modalContent}
        visible={visible}
        toggleVisible={setVisibility}
      />

      <div className="flex flex-row">
        <UpButton color="white" />
        <div className="h-24 w-52 mt-3 relative">
          <Image
            objectFit="contain"
            src={"/images/sensiblog.png"}
            layout="fill"
          />
        </div>
      </div>

      <div className="flex flex-row">
        <div
          onClick={() => setVisibility(true)}
          className="pt-6 h-6"
        >
          <button className="text-lg underline-offset-1 tracking-wide underline mr-6 hover:text-violeta text-white">
            Sobre Sensiblog
          </button>
        </div>

        <div className="p-6">
          <LanguageButton onClick={toggleFunc} lang={lang} color="white" />
        </div>
      </div>
    </div>
  );
};

export default SensiblogNavbar;
