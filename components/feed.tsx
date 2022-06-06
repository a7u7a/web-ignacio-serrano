import DateEl from "./date";
import { feedPost } from "../interfaces/posts";
import { useState } from "react";

export default function Feed({ feedData }: { feedData: feedPost[] }) {
  const [hover, setHover] = useState("");

  return (
    <>
      <div
        className="w-1/2 bg-no-repeat bg-center bg-violet-400"
        style={{ backgroundImage: `url(${hover})` }}
      >
        <h1 className="fixed w-1/2 mt-16 mb-16 object-center rotate-45 text-center text-3xl">
          Feed
        </h1>
        <div className="h-full pb-12 overflow-auto">
          <div className="pt-44 flex flex-col">
            {feedData.map((post) => (
              <button
                className="text-center pt-6 pb-6 text-2xl object-center"
                key={post.id}
                onMouseEnter={() => setHover(post.thumbnail)}
                onMouseLeave={() => setHover("")}
              >
                <a>{post.title}</a>
                <br />
                <small>
                  <DateEl dateString={post.date} />
                </small>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
