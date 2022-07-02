import { X } from "phosphor-react";
import { modalContent } from "../../interfaces/posts";
import FromMarkdown from "../postFromMarkdown";

interface SensiblogModalProps {
  content: modalContent;
  visible: boolean;
  toggleVisible: (visible: boolean) => void;
}

const SensiblogModal = ({
  content,
  visible,
  toggleVisible,
}: SensiblogModalProps) => {
  function clickOutsideHandle(e: React.MouseEvent<Element, MouseEvent>) {
    if (e.currentTarget === e.target) {
      toggleVisible(false);
    }
  }

  return (
    <div
      className={`inset-0 z-50 flex items-center justify-center ${
        visible ? "fixed" : "hidden"
      }`}
    >
      <div
        onClick={(e) => clickOutsideHandle(e)}
        className="w-screen h-screen"
      ></div>
      <div className="text-black w-5/6 md:w-1/2 max-h-screen absolute bg-violeta drop-shadow-2xl">
        <div className="relative">
          <button
            onClick={() => toggleVisible(false)}
            className="absolute m-2 right-0 top-0"
          >
            <X size={42} />
          </button>
        </div>
        <div className="p-8 flex flex-col max-h-screen items-center overflow-auto">
          <FromMarkdown className="md-modal" contentMd={content.contentSpanish}/>
        </div>
      </div>
    </div>
  );
};

export default SensiblogModal;
