import { useState, useEffect } from "react";
import { posiblePost } from "../../interfaces/posts";
import Link from "next/link";
import Sticker from "./../sticker";
import useMediaQuery from "../../lib/media";

interface IndexItemProps {
  post: posiblePost;
  onEnter: (id: string) => void;
  onExit: () => void;
  hover: boolean;
}

const IndexItem = ({ post, onEnter, onExit, hover }: IndexItemProps) => {
  const isSm = useMediaQuery("(max-width: 768px)");

  return (
    <div key={post.id} className="flex relative w-full h-20">
      <Link href={`/posible/${post.id}`}>
        <div className="cursor-pointer">
          <div
            className={`absolute w-full h-full`}
          />
          <div className="absolute flex w-full h-full items-center justify-center">
            <p
              className={`flex text-center text-3xl font-light ${
                hover ? "text-white" : "text-black"
              }`}
            >
              {post.title}
            </p>
          </div>
          <Sticker
            id={post.id}
            color={post.stock ? "#05FF00" : "#FFFF00"}
            onEnter={onEnter}
            onExit={onExit}
            tag={post.stock ? "Disponible" : "Agotado"}
            marginY={40}
            marginX={isSm ? 80 : 300}
          />
        </div>
      </Link>
    </div>
  );
};
export default IndexItem;
