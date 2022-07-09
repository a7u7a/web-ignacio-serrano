import Link from "next/link";
import { sensiblogPost } from "../../interfaces/posts";

interface RelatedPostsProps {
  relatedPosts: sensiblogPost[];
  lang: string;
}

const RelatedPosts = ({ relatedPosts, lang }: RelatedPostsProps) => {
  return (
    <div className="w-full ">
      <p className="font-semibold text-lg underline underline-offset-1 text-violeta">
        {lang === "spa" ? "Posts relacionados:" : "Related posts:"}
      </p>
      <div className="relative flex flex-col space-y-4 mt-3 h-[32rem] border-white">
        {relatedPosts && relatedPosts.length ? (
          relatedPosts.map((related, i) => (
            <div key={i} className="text-white hover:text-verde">
              <div className="font-semibold hover:underline">
                <Link href={"/" + related.id}>
                  {lang === "spa" ? related.title : related.title_eng}
                </Link>
              </div>

              <div className="flex flex-col">
                <div>
                  {related.tags.map((tag, i) => (
                    <p key={i} className="inline pr-2">
                      {`#${tag}`}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No han sido encontrados..</div>
        )}
      </div>
    </div>
  );
};
export default RelatedPosts;
