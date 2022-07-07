import { sensiblogPost } from "./../interfaces/posts";
import DateEl from "./../components/date";

interface RelatedPostsProps {
    posts: sensiblogPost[];
    lang: string
  }
  
  const RelatedPosts = ({ posts, lang }: RelatedPostsProps) => {
    return <><p className="font-semibold">Posts relacionados:</p>
    {posts.map((related, i) => (
      <div key={i} className="">
        <div>
          {lang === "spa" ? related.title : related.title_eng}
        </div>
        {related.category} {related.tags} {related.date}
        <DateEl dateString={related.date} />
      </div>
    ))}</>;
  };
  export default RelatedPosts;