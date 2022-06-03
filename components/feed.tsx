import Link from "next/link";
import DateEl from "./date";
import { feedPost } from "../interfaces/posts";
import { allFeedData } from "../interfaces/posts";

export default function Feed({
  allFeedDataa,
}: {
  allFeedDataa: allFeedData[];
}) {
  // console.log("allFeedDataAAAAA",allFeedData);
  return (
    <>
      <h1 className="fixed w-1/2 mt-16 mb-16 object-center rotate-45 text-center text-3xl">
        Feed
      </h1>
      <div className="h-full pb-12 overflow-auto">
        <div className="pt-44 flex flex-col space-y-12">
          {allFeedDataa.map(({ id, date, title }) => (
            <div className="text-center text-2xl" key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small>
                <DateEl dateString={date} />
              </small>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
