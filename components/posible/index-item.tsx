import { useState, useEffect } from "react";
import { posiblePost } from "../../interfaces/posts";
import Link from "next/link";
import Sticker from "./../sticker";
import useMediaQuery from "../../lib/media";

interface IndexItemProps {
  post: posiblePost;
}

const IndexItem = ({ post }: IndexItemProps) => {
  const isSm = useMediaQuery("(max-width: 768px)");
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    if (isSm) {
      setBackgroundImage(post.thumbnail);
    } else {
      setBackgroundImage("");
    }
  }, [isSm]);
  return (
    <div
      key={post.id}
      className="flex relative bg-no-repeat bg-center bg-cover w-full h-36"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Link href={`/posible/${post.id}`}>
        <div className="cursor-pointer">
          <div className="absolute flex w-full h-full items-center justify-center">
            <p className="flex text-center text-5xl font-light">{post.title}</p>
          </div>
          <Sticker
            id={post.id}
            color={post.stock ? "#05FF00" : "#FFFF00"}
            onEnter={() => {
              if (!isSm) setBackgroundImage(post.thumbnail);
            }}
            onExit={() => {
              if (!isSm) setBackgroundImage("");
            }}
            tag={post.stock ? "Disponible" : "Agotado"}
            marginY={40}
            marginX={isSm ? 80 : 220}
          />
        </div>
      </Link>
    </div>
  );
};
export default IndexItem;
