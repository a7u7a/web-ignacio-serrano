import Link from "next/link";
import { feedPost } from "../../interfaces/posts";

interface RelatedFeedPostsProps {
  feedPosts: feedPost[];
  currentPost: feedPost;
}

const getRelatedFeedPosts = (
  feedPosts: feedPost[],
  targetTags: string[],
  idSkip: string
): feedPost[] => {
  const maxPosts = 5;
  const xPosts: feedPost[] = [];
  feedPosts.map((post) => {
    // find intersecting tags for current post, if any
    const currentTags = post.tags;
    const xTags = currentTags.filter((tag) => targetTags.includes(tag));
    if (xTags.length > 0 && post.id !== idSkip) {
      xPosts.push(post);
    }
  });
  // truncate to max posts
  return xPosts.slice(0, maxPosts);
};

const RelatedFeedPosts = ({
  feedPosts,
  currentPost,
}: RelatedFeedPostsProps) => {
  let relatedPosts;
  if (currentPost) {
    relatedPosts = getRelatedFeedPosts(
      feedPosts,
      currentPost.tags,
      currentPost.id
    );
  }
  return (
    <div className="text-sm mt-10">
      <p className="underline text-gray-600">Otros posts relacionados:</p>
      <div className="flex flex-col w-full space-y-3 mt-2">
        {relatedPosts && relatedPosts.length ? (
          relatedPosts.map((related, i) => (
            <div key={i} className="flex flex-col">
              <div className="font-semibold text-lg hover:text-verde hover:underline">
                <Link href={"/about?post=" + related.id}>{related.title}</Link>
              </div>
              <div className="w-full flex flex-row flex-wrap">
                {related.tags.map((tag, i) => (
                  <p key={i} className="inline pr-2">
                    {`#${tag}`}
                  </p>
                ))}
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

export default RelatedFeedPosts;
