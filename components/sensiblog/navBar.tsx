import Image from "next/image";
import UpButton from "../upBtn";
import LanguageButton from "../languageBtn";
import SensiblogModal from "../sensiblog/modal";
import { modalContent } from "../../interfaces/posts";
import { useState } from "react";
import Link from "next/link";

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
    <div>
      <div className="sticky inset-x-0 top-0 flex items-center flex-col sm:flex-row justify-between w-full z-40 bg-black">
      <UpButton color="white" />
        <SensiblogModal
          content={modalContent}
          visible={visible}
          toggleVisible={setVisibility}
        />

        {/* Sensiblog logo */}
        <div className="flex flex-row">
          <div className="h-16 md:h-20 lg:h-24 w-44 md:w-48 lg:w-52 ml-14 mr-14 mt-3 relative">
            <Image
              objectFit="contain"
              src={"/images/sensiblog.png"}
              layout="fill"
            />
          </div>
        </div>

        <div className="flex flex-row pt-1 pb-3 md:p-6 space-x-8 ">
          {/* about button */}
          <div onClick={() => setVisibility(true)}>
            <button className="sm:text-md md:text-lg underline-offset-1 tracking-wide underline mr-6 hover:text-violeta text-white">
              Sobre Sensiblog
            </button>
          </div>

          <LanguageButton onClick={toggleFunc} lang={lang} color="white" />

        </div>
      </div>
    </div>
  );
};

export default SensiblogNavbar;
