import { ArrowRight } from "phosphor-react";

interface SectionTabProps {
  tabText: string;
}

const SectionTab = ({ tabText }: SectionTabProps) => {
  return (
    <div className="absolute flex flex-row space-x-1 items-center bg-amarillo font-semibold text-xs sm:text-sm z-30 py-0 sm:py-1 px-2">
      <ArrowRight size={18} color="#1f1a1a" />
      <a>{tabText}</a>
    </div>
  );
};
export default SectionTab;
