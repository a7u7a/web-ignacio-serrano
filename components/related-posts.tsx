import Link from "next/link";
import { sensiblogPost } from "./../interfaces/posts";
import DateEl from "./../components/date";

interface RelatedPostsProps {
  posts: sensiblogPost[];
  lang: string;
}

const RelatedPosts = ({ posts, lang }: RelatedPostsProps) => {
  return (
    <div className="w-full text-gray-300">
      <p className="font-semibold text-lg underline underline-offset-1 text-violeta">
        {lang === "spa" ? "Posts relacionados:" : "Related posts:"}
      </p>
      <div className="relative flex flex-col space-y-4 mt-2 overflow-y-auto h-[32rem] border-white">
        {posts.map((related, i) => (
          <div key={i} className="">
            <div className="font-semibold text-lg hover:text-verde hover:underline">
              <Link href={"/" + related.id}>
                {lang === "spa" ? related.title : related.title_eng}
              </Link>
            </div>

            <div className="flex flex-col text-sm ">
              <div>
                {related.tags.map((tag, i) => (
                  <p key={i} className="inline pr-2">
                    {`#${tag}`}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RelatedPosts;
