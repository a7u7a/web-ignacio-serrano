import Image from "next/image";
import UpButton from "../upBtn";
import LanguageButton from "../languageBtn";
import Modal from "../modal";
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
  const [visibleModal, setModalVisibility] = useState(false);
  return (
    <div>
      <div className="sticky inset-x-0 top-0 flex items-center flex-col sm:flex-row justify-between w-full z-40 bg-black">
        <UpButton color="white" href="/" />
        <Modal
          content={modalContent}
          visible={visibleModal}
          toggleVisible={setModalVisibility}
        />

        {/* Sensiblog logo */}
        <div className="flex flex-row">
          <div className="h-16 md:h-20 lg:h-24 w-44 md:w-48 lg:w-52 ml-0 sm:ml-20 mr-0 sm:mr-14 mt-3 relative">
            <Image
              objectFit="contain"
              src={"/images/sensiblog.gif"}
              layout="fill"
            />
          </div>
        </div>

        <div className="flex flex-row pt-1 mr-6 pb-3 md:p-6 space-x-8 ">
          {/* about button */}
          <div onClick={() => setModalVisibility(true)}>
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
