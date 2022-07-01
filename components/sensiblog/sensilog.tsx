import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import { ArrowDown } from "phosphor-react";
import { sensiblogPost } from "../../interfaces/posts";
import IndexEntry from "../../components/sensiblog/indexEntry";

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
    <ScrollSync>
      <div className="relative flex flex-col w-full space-y-3 mb-3">
        <div className="absolute flex max-w-min flex-row space-x-1 bg-white font-semibold text-sm z-30 py-1 px-2">
          <ArrowDown size={18} color="#1f1a1a" />
          <a>Categorías</a>
        </div>
        {categories.map((category) => (
          <ScrollSyncPane>
            <div
              className="flex flex-row overflow-x-auto space-x-3 pr-64 no-scroll-bar"
              key={category}
            >
              <div className="sticky left-0 flex items-center justify-center text-3xl font-serif p-6 text-white bg-gradient-to-r from-black to-black/50 z-20 ">
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
          </ScrollSyncPane>
        ))}
      </div>
    </ScrollSync>
  );
};

export default SensiCatalog;
