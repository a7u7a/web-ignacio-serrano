import DateEl from "../date";
import { useState, useRef } from "react";
import { feedPost } from "../../interfaces/posts";
import { X } from "phosphor-react";
import Sticker from "../sticker";
import FromMarkdown from "../from-markdown";
import XButton from "../xBtn";
import RelatedFeedPosts from "./related-feed-posts";

export default function Feed({ feedPosts }: { feedPosts: feedPost[] }) {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [articleDisplay, setArticle] = useState<feedPost | undefined>();
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
    setArticle(nextPost ? nextPost : articleDisplay);
  }

  function onEnter(id: string) {
    setHoverId(id);
  }
  function onExit() {
    setHoverId(undefined);
  }
  return (
    <>
      <div
        className="relative w-full md:w-1/2 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Article modal (make comp)*/}
        <div
          className={`fixed inset-0 md:absolute md:top-0 md:right-0 z-50 w-full h-full bg-violet-400 overflow-auto ${
            articleDisplay ? "visible" : "invisible"
          }`}
        >
          <XButton color="black" onClick={() => setArticle(undefined)} />
          <div className="m-12 mt-8 text-white">
            <div className="text-sm">
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
              className="feed"
            />
            <div className="text-sm mt-6">
              <p className="underline text-gray-600">Tags:</p>
              {articleDisplay?.tags.map((tag) => (
                <p key={tag} className="inline mr-2">{`#${tag}`}</p>
              ))}
            </div>
            <RelatedFeedPosts
              feedPosts={feedPosts}
              currentPost={articleDisplay!}
            />
          </div>
        </div>

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
                  setArticle(
                    feedPosts.filter((feedPost) => feedPost.id === post.id)[0]
                  );
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
                ></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
