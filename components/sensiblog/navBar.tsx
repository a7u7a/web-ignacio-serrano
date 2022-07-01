import Image from "next/image";
import UpButton from "../upBtn";
import LanguageButton from "../languageBtn";
import SensiblogModal from "../sensiblog/modal";
import { modalContent } from "../../interfaces/posts";
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
    <div className="sticky inset-x-0 top-0 flex flex-col sm:flex-row justify-between w-full z-40 bg-black">
      <SensiblogModal
        content={modalContent}
        visible={visible}
        toggleVisible={setVisibility}
      />
      <UpButton color="white" />
      
      {/* Sensiblog logo */}
      <div className="flex flex-row">
        <div className="h-16 md:h-20 lg:h-24 w-44 md:w-48 lg:w-52 ml-14 mr-14  mt-3 relative">
          <Image
            objectFit="contain"
            src={"/images/sensiblog.png"}
            layout="fill"
          />
        </div>
      </div>

      <div className="flex flex-row">

        {/* about button */}
        <div onClick={() => setVisibility(true)} className="pt-6 h-6">
          <button className="sm:text-md md:text-lg underline-offset-1 tracking-wide underline mr-6 hover:text-violeta text-white">
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
