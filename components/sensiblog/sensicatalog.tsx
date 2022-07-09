import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import { sensiblogPost } from "../../interfaces/posts";
import IndexEntry from "./indexEntry";
import SectionTab from "./section-tab";

interface SensiCatalogProps {
  allSensiblogPosts: sensiblogPost[];
  lang: string;
}

function getCategories(allPosts: sensiblogPost[]) {
  const _ = allPosts.map((post) => {
    return post.category;
  });
  return [...new Set(_)]; // remove duplicates
}

const SensiCatalog = ({ allSensiblogPosts, lang }: SensiCatalogProps) => {
  const categories = getCategories(allSensiblogPosts);
  return (
    
      <div className="relative flex flex-col w-full space-y-3">
        <SectionTab tabText="Categorías" />
        {categories.map((category) => (
          
            <div
              className="flex flex-row overflow-x-auto pr-32 no-scroll-bar"
              key={category}
            >
              <div className="sticky left-0 flex items-center justify-center text-base sm:text-xl md:text-xl font-semibold p-3 sm:p-6 text-white bg-gradient-to-r from-black to-black/50 z-20">
                {category}
              </div>
              {allSensiblogPosts
                .filter((post) => {
                  return post.category === category;
                })
                .map((post) => (
                  <IndexEntry post={post} lang={lang} key={post.id} />
                ))}
            </div>
          
        ))}
      </div>
    
  );
};

export default SensiCatalog;
