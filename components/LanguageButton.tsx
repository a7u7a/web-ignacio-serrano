import { aboutPost } from "../interfaces/posts";
import ReactMarkdown from "react-markdown";
import NavLink from "./navlink";

interface LanguageButtonProps {
  onClick: () => void;
  lang: string;
}

const LanguageButton = ({onClick, lang}: LanguageButtonProps) => {
  const weights = ["bold", "normal"];
  const weight = lang === "spa" ? weights[0] : weights[1];
  return (
    <button
      className="flex flex-row text-center px-1 py-0 rounded border-2 border-gray-800 items-center active:bg-gray-800 active:text-gray-100 active:border-black hover:bg-verde hover:border-violeta hover:text-violeta"
      onClick={onClick}
    >
      {/* <div className={`font-${weight}`}>spa</div> */}
      <div className={lang === "spa" ? "font-extrabold" : "font-normal"}>
        spa
      </div>
      <div>/</div>
      <div className={lang === "eng" ? "font-extrabold" : "font-normal"}>
        eng
      </div>
    </button>
  );
};

export default LanguageButton;
