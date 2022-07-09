import { GetStaticProps } from "next";
import { posiblePost, modalContent } from "../interfaces/posts";
import { getSortedPosiblePosts, getModalContents } from "../lib/posts";
import Image from "next/image";
import UpButton from "../components/upBtn";
import MyFooter from "../components/footer";
import IndexItem from "../components/posible/index-item";

interface PosibleProps {
  allPosiblePosts: posiblePost[];
  modalContents: modalContent;
}

const Posible = ({ allPosiblePosts, modalContents }: PosibleProps) => {
  console.log("allPosiblePosts", allPosiblePosts);

  return (
    <div className="flex flex-col justify-between">
      <div>
        <div className="flex sticky items-center justify-center w-full bg-verde h-36">
          <div className="absolute pl-6 pb-3 underline z-20 left-auto md:left-0 bottom-0">
            Qué es esto?
          </div>
          <div className="relative h-full w-52 md:w-full mb-3 md:mb-0">
            <Image
              objectFit="contain"
              src={"/images/posible.png"}
              layout="fill"
            />
          </div>
        </div>
        <div className="flex flex-col py-2">
          {allPosiblePosts.map((post) => (
            <IndexItem key={post.id} post={post} />
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
