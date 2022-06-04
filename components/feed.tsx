import Link from "next/link";
import DateEl from "./date";
import { feedPost } from "../interfaces/posts";
import Image from "next/image";
import { useState } from "react";

export default function Feed({ feedData }: { feedData: feedPost[] }) {
  const [hover, setHover] = useState(false);
  const path1 = "/uploads/screen-shot-2021-05-24-at-20.47.11.png";
  const path2 = "/uploads/screen-shot-2021-12-21-at-00.15.14.png";

  return (
    <>
      <div
        className=" w-1/2 bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${path1}` }}
      >
        <h1 className="fixed w-1/2 mt-16 mb-16 object-center rotate-45 text-center text-3xl">
          Feed
        </h1>
        <div className="h-full pb-12 overflow-auto">
          <div className="pt-44 flex flex-col">
            {feedData.map(({ id, date, title }) => (
              <button
                className="text-center pt-6 pb-6 text-2xl object-center"
                key={id}
              >
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small>
                  <DateEl dateString={date} />
                </small>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
