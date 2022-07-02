interface LanguageButtonProps {
  onClick: () => void;
  lang: string;
  color: string;
}

const LanguageButton = ({ onClick, lang, color }: LanguageButtonProps) => {
  return (
    <button
      className={`flex flex-row space-x-0.5 z-40 text-center px-1 h-7 rounded border-2 text-sm sm:text-sm md:text-base ${
        color === "white"
          ? "bg-black text-white border-white "
          : "bg-white text-black border-black"
      }  items-center active:bg-gray-800 active:text-gray-100 active:border-black hover:bg-verde hover:border-violeta hover:text-violeta`}
      onClick={onClick}
    >
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
