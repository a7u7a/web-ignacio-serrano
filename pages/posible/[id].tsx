import { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  getAllPosibleIds,
  getPosiblePost,
  getModalContents,
} from "../../lib/posts";
import { posiblePost, modalContent } from "../../interfaces/posts";
import FromMarkdownHorizontal from "../../components/from-markdown-horizontal";
import LanguageButton from "../../components/languageBtn";
import UpButton from "../../components/upBtn";
import FromMarkdown from "../../components/from-markdown";
import Modal from "../../components/modal";

interface PosiblePostProps {
  post: posiblePost;
  modalContent: modalContent;
}

export default function Post({ post, modalContent }: PosiblePostProps) {
  const [visibleModal, setModalVisibility] = useState(false);
  const [lang, setLang] = useState("spa");
  const content =
    lang === "spa" ? post.contentSpanish : post.descriptionEnglish;
  var peso = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  });

  function toggleLang() {
    if (lang === "spa") {
      setLang("eng");
    } else {
      setLang("spa");
    }
  }

  return (
    <div className="flex justify-between flex-col md:flex-row h-screen  overflow-x-auto">
      <UpButton color="black" href="/posible" />
      <Modal
        content={modalContent}
        visible={visibleModal}
        toggleVisible={setModalVisibility}
      />
      <div className="absolute top-0 right-0 p-6 z-10">
        <LanguageButton onClick={toggleLang} lang={lang} color="black" />
      </div>
      <div className="absolute p-6">
        <div className="relative flex flex-col w-80">
          <div className="flex flex-col pt-10 md:pt-24 pl-0 md:pl-8">
            {/* Title */}
            <div className="mt-3 font-light text-3xl w-52">{post.title}</div>
            <div className="flex flex-row space-x-10 mt-6">
              <p className="text-lg">{peso.format(post.price)}</p>
              <button
                disabled={post.stock > 0 ? false : true}
                onClick={() => setModalVisibility(true)}
                className={`text-black rounded ${
                  post.stock > 0
                    ? "bg-verde text-black"
                    : "bg-gray-200 text-gray-600"
                } py-0.5 px-1.5 text-sm font-medium`}
              >
                {post.stock > 0 ? "Comprar" : "Agotado"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pl-6 md:pl-14 pt-56 md:pt-80">
        <FromMarkdown contentMd={content} proseClass={"posible-description"} />
      </div>

      <div className="pl-0 md:pl-12">
        <FromMarkdownHorizontal
          contentMd={post.photos}
          className="flex flex-col md:flex-row w-full pt-2 px-6 sm:px-8 md:px-10 lg:px-10 md:pt-12 pb-12"
          proseClass="posible"
        />
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPosibleIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPosiblePost(params!.id as string);
  const modalContent = getModalContents("como-comprar");
  return {
    props: {
      post,
      modalContent,
    },
  };
};
