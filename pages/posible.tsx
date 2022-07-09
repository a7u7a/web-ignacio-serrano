import { GetStaticProps } from "next";
import { posiblePost, modalContent } from "../interfaces/posts";
import { getSortedPosiblePosts, getModalContents } from "../lib/posts";
import Image from "next/image";
import UpButton from "../components/upBtn";
import MyFooter from "../components/footer";
import Link from "next/link";

interface PosibleProps {
  allPosiblePosts: posiblePost[];
  modalContents: modalContent;
}

const Posible = ({ allPosiblePosts, modalContents }: PosibleProps) => {
  console.log("allPosiblePosts", allPosiblePosts);
  return (
    <div className="flex flex-col justify-between">
      <div>
        <div className="sticky inset-x-0 top-0 w-full bg-verde h-36">
          <div className="pt-16 pl-7 underline">Qué es posible?</div>
          <div className="absolute inset-0">
            <Image
              objectFit="contain"
              src={"/images/posible.png"}
              layout="fill"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          {allPosiblePosts.map((post) => (
            <div className="py-5 bg-no-repeat bg-center bg-cover w-full"
            style={{ backgroundImage: `url(${post.thumbnail})` }}
            >
              <p className="text-center text-5xl font-light">{post.title}</p>
            </div>
          ))}
        </div>
      </div>
      <MyFooter color="white" />
      <UpButton color="black" href="/" />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPosiblePosts = getSortedPosiblePosts();
  console.log("asdasda", allPosiblePosts);
  const modalContents = getModalContents("about-posible");
  return {
    props: {
      allPosiblePosts,
      modalContents,
    },
  };
};

export default Posible;
