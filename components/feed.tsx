import Link from "next/link";
import DateEl from "./date";
import { feedPost } from "../interfaces/posts";

export default function Feed({ feedData }: { feedData: feedPost[] }) {
  return (
    <>
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
    </>
  );
}
