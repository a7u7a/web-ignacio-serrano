import { GetStaticProps } from "next";
import { useState } from "react";
import Image from "next/image";
import { posiblePost, modalContent } from "../interfaces/posts";
import { getSortedPosiblePosts, getModalContents } from "../lib/posts";
import UpButton from "../components/upBtn";
import MyFooter from "../components/footer";
import IndexItem from "../components/posible/index-item";
import Modal from "../components/sensiblog/modal";

interface PosibleProps {
  allPosiblePosts: posiblePost[];
  modalContent: modalContent;
}

const Posible = ({ allPosiblePosts, modalContent }: PosibleProps) => {
  const [visibleModal, setModalVisibility] = useState(false);
  return (
    <div className="flex flex-col justify-between">
      <div>
        <div className="flex sticky items-center justify-center w-full bg-verde h-36">
          <div
            onClick={() => setModalVisibility(true)}
            className="absolute pl-0 md:pl-6 pb-3 underline z-20 md:left-0 bottom-0 cursor-pointer"
          >
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
      <Modal
        content={modalContent}
        visible={visibleModal}
        toggleVisible={setModalVisibility}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPosiblePosts = getSortedPosiblePosts();
  const modalContent = getModalContents("about-posible");
  return {
    props: {
      allPosiblePosts,
      modalContent,
    },
  };
};

export default Posible;
