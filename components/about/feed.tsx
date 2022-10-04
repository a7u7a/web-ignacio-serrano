import DateEl from "../date";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { feedPost } from "../../interfaces/posts";
import { Divide, X } from "phosphor-react";
import Sticker from "../sticker";
import FromMarkdown from "../from-markdown";
import XButton from "../xBtn";
import RelatedFeedPosts from "./related-feed-posts";

const validPostId = (id: string, posts: feedPost[]) => {
  return posts.filter((post) => post.id === id);
};

export default function Feed({ feedPosts }: { feedPosts: feedPost[] }) {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [articleDisplay, setArticle] = useState<feedPost | undefined>();
  const [urlError, setUrlError] = useState(false);
  const [hoverId, setHoverId] = useState<string | undefined>(undefined);
  const [tagColors, setTagColors] = useState(getTagColors());
  const childFunc = useRef(null);

  function getTagColors() {
    // Get the first tag on each post. Used to determine sticker color
    // return a obj of unique tags and color for each tag {tag1:tag1color, tag2:tag2color, ...}
    const colors = [
      "#05FF00",
      "#891FF3",
      "#FFFF00",
      "#0500FF",
      "#FF0000",
      "#FF00E5",
    ];

    // get tags and remove duplicates
    const _ = feedPosts.map((post) => {
      return post.tags[0];
    });

    const tags = [...new Set(_)];

    const tagColors = [];
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i] as string;
      tagColors.push({ tag: tag, color: colors[i % colors.length] });
    }

    return tagColors;
  }

  function changeArticle(direction: "up" | "down") {
    const index = feedPosts.indexOf(articleDisplay!);
    const mod = direction === "up" ? +1 : -1;
    const nextPost = feedPosts[index + mod];
    if (nextPost) {
      router.push("/about?post=" + nextPost.id);
    }
  }

  function onEnter(id: string) {
    setHoverId(id);
  }

  function onExit() {
    setHoverId(undefined);
  }

  const router = useRouter();

  useEffect(() => {
    // clear url params when clicking on x button
    // add url params when clicking on a post

    if (router.query["post"]) {
      // when something is found on url
      const urlId = router.query["post"] as string;
      const post = validPostId(urlId, feedPosts);

      // show post when id is valid
      if (post.length) {
        setArticle(post[0]);
        // update url param
      } else {
        // show error when invalid
        setUrlError(true);
      }
    } else {
      // no article found in url
      setArticle(undefined);
    }
  }, [router]);

  return (
    <>
      <div
        className="relative w-full md:w-1/2 bg-no-repeat bg-center bg-violet-400 bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Article modal (todo: make component)*/}
        {urlError ? (
          <div className="fixed inset-0 md:absolute md:top-0 md:right-0 z-50 w-full h-full bg-violet-400 overflow-auto">
            <div className="m-12 text-3xl font-light text-white ">
              Post no encontrado :(
            </div>
            <XButton
              color="black"
              onClick={() => {
                setUrlError(false);
                // clear url params
                router.replace("/about", undefined, { shallow: true });
              }}
            />
          </div>
        ) : (
          <div
            className={`fixed inset-0 md:absolute md:top-0 md:right-0 z-50 w-full h-full bg-violet-400 overflow-auto ${
              articleDisplay ? "visible" : "invisible"
            }`}
          >
            <XButton
              color="black"
              onClick={() => {
                setArticle(undefined);
                // clear url params
                router.replace("/about", undefined, { shallow: true });
              }}
            />
            <div className="flex flex-col items-center text-white m-6 md:ml-14 md:mr-14 lg:ml-20 lg:mr-20 lg:max-w-xl">
              <div className="w-full text-sm">
                <button
                  onClick={() => changeArticle("up")}
                  className="underline inline hover:text-verde"
                >
                  Anterior
                </button>
                <p className="inline mx-1">/</p>
                <button
                  onClick={() => changeArticle("down")}
                  className="underline inline hover:text-verde"
                >
                  Siguiente
                </button>
              </div>
              <div className="text-3xl font-light text-white mt-12">
                {articleDisplay?.title}
              </div>
              <div className="text-gray-600 mt-2">
                <DateEl
                  dateString={articleDisplay ? articleDisplay.date : ""}
                  className="text-xs"
                />
              </div>
              <FromMarkdown
                contentMd={
                  articleDisplay?.contentSpanish
                    ? articleDisplay.contentSpanish
                    : ""
                }
                proseClass="feed"
              />
              <div className="text-sm mt-6">
                <p className="underline text-gray-600">Tags:</p>
                <div className="w-2/3 flex flex-row flex-wrap">
                  {articleDisplay?.tags.map((tag) => (
                    <p key={tag} className="inline mr-2">{`#${tag}`}</p>
                  ))}
                </div>
              </div>
              <RelatedFeedPosts
                feedPosts={feedPosts}
                currentPost={articleDisplay!}
              />
            </div>
          </div>
        )}

        <div className="flex static md:fixed justify-center w-full md:w-1/2 mt-10 md:mt-16 mb-6 md:mb-16 z-40">
          <h1 className="rotate-45 text-center text-3xl">Feed</h1>
        </div>
        <div className="h-full pb-12 md:overflow-auto no-scroll-bar">
          <div className="md:pt-44 flex flex-col">
            {feedPosts.map((post) => (
              <button
                className="relative -mb-4 w-full flex place-content-center"
                key={post.id}
                onMouseEnter={() => setBackgroundImage(post.thumbnail)}
                onMouseLeave={() => setBackgroundImage("")}
                onClick={() => {
                  router.push("/about?post=" + post.id);
                }}
              >
                <div
                  className={`flex flex-col text-center z-20 my-6 ${
                    hoverId === post.id ? "text-white" : "text-black"
                  }`}
                >
                  <p className="text-5xl px-4 font-light">{post.title}</p>
                  <DateEl dateString={post.date} className="text-sm" />
                </div>

                {/* svg viewbox sits on top of everything and so it has detect to detext hover events */}
                <Sticker
                  id={post.id}
                  color={
                    tagColors.filter(
                      (tagColor) => tagColor.tag === post.tags[0]
                    )[0].color
                  }
                  onEnter={onEnter}
                  onExit={onExit}
                  tag={post.tags[0]}
                  marginY={40}
                  marginX={80}
                />
                <div
                  className={`absolute w-full h-full ${
                    hoverId === post.id
                      ? "mix-blend-exclusion bg-violet-300"
                      : ""
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
