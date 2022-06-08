import DateEl from "./date";
import { feedPost } from "../interfaces/posts";
import { useState, useRef } from "react";
import { X } from "phosphor-react";
import ReactMarkdown from "react-markdown";
import NavLink from "./navlink";
import Sticker from "./sticker";

export default function Feed({ feedData }: { feedData: feedPost[] }) {
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

    const _: string[] = [];
    feedData.forEach((post) => {
      _.push(post.tags[0]);
    });
    // remove duplicates
    const tags = [...new Set(_)];

    const tagColors = [];
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i] as string;
      tagColors.push({ tag: tag, color: colors[i % colors.length] });
    }

    return tagColors;
  }

  function changeArticle(direction: "up" | "down") {
    const index = feedData.indexOf(articleDisplay!);
    const mod = direction === "up" ? +1 : -1;
    const nextPost = feedData[index + mod];
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
        className="w-1/2 bg-no-repeat bg-center bg-cover bg-violet-400"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Article modal (make comp)*/}
        <div
          className={`absolute z-50 w-1/2 h-full bg-violet-400 ${
            articleDisplay ? "visible" : "invisible"
          }`}
        >
          <button
            className="absolute top-0 right-0 m-2"
            onClick={() => setArticle(undefined)}
          >
            <X size={42} />
          </button>
          <div className="m-12">
            <div className="text-sm">
              <button
                onClick={() => changeArticle("down")}
                className="underline inline"
              >
                Anterior
              </button>
              <p className="inline mx-1">/</p>
              <button
                onClick={() => changeArticle("up")}
                className="underline inline"
              >
                Siguiente
              </button>
            </div>
            <div className="text-3xl mt-6">{articleDisplay?.title}</div>
            <div className="text-sm mt-4">{articleDisplay?.date}</div>
            <ReactMarkdown
              className="feed"
              components={{
                a: ({ node, children }) => {
                  return (
                    <NavLink
                      url={node.properties!.href as string}
                      text={children[0] as string}
                    />
                  );
                },
              }}
            >
              {articleDisplay?.contentSpanish
                ? articleDisplay.contentSpanish
                : ""}
            </ReactMarkdown>
            <div className="text-sm mt-4">
              <p>Tags:</p>
              {articleDisplay?.tags.map((tag) => (
                <p key={tag} className="inline mr-2">{`#${tag}`}</p>
              ))}
            </div>
          </div>
        </div>

        <h1 className="fixed w-1/2 mt-16 mb-16 object-center rotate-45 text-center text-3xl z-40">
          Feed
        </h1>
        <div className="h-full pb-12 overflow-auto">
          <div className="pt-44 flex flex-col">
            {feedData.map((post) => (
              <button
                className="relative -mb-4 w-full flex items-center place-content-center"
                key={post.id}
                onMouseEnter={() => setBackgroundImage(post.thumbnail)}
                onMouseLeave={() => setBackgroundImage("")}
                onClick={() => {
                  setArticle(
                    feedData.filter((feedPost) => feedPost.id === post.id)[0]
                  );
                }}
              >
                <div
                  className={`flex flex-col text-center z-20 my-6 ${
                    hoverId === post.id ? "text-white" : "text-black"
                  }`}
                >
                  <a className="text-5xl px-4 font-light">{post.title}</a>
                  <DateEl dateString={post.date} />
                </div>

                  {/* I wanted to have the svg viewbox on top of everything so it has detect the hover events */}
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
