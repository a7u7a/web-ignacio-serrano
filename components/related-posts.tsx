import Link from "next/link";
import { sensiblogPost } from "./../interfaces/posts";
import DateEl from "./../components/date";

interface RelatedPostsProps {
  posts: sensiblogPost[];
  lang: string;
}

const RelatedPosts = ({ posts, lang }: RelatedPostsProps) => {
  return (
    <div className="w-full border-t-2">
      <p className="font-semibold mt-2">
        {lang === "spa" ? "Posts relacionados:" : "Related posts:"}
      </p>
      <div className="flex flex-col space-y-2 mt-2 overflow-y-auto h-[32rem] border-white">
        {posts.map((related, i) => (
          <div key={i} className="">
            <div className="font-serif text-lg hover:text-verde hover:underline">
              <Link href={"/" + related.id}>
                {lang === "spa" ? related.title : related.title_eng}
              </Link>
            </div>

            <div className="flex flex-col text-sm text-slate-400">
              <div>
                Tags:
                {related.tags.map((tag, i) => (
                  <p key={i} className="inline pl-2">
                    {`${tag}`}
                  </p>
                ))}
              </div>
              <DateEl dateString={related.date} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RelatedPosts;
