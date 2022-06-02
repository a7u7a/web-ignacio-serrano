import Head from "next/head";
import { getCollectionData } from "../lib/posts";
import Link from "next/link";
import { GetStaticProps } from "next";
import { AboutCollection } from "../models/aboutCollection.models";
import Intro from "../components/intro";
import Bio from "../components/bio";
import CV from "../components/cv";
import utilStyles from "../styles/utils.module.css";
import { ArrowElbowLeftUp } from "phosphor-react";

const pageName = "About";

export default function About({
  allPostsData,
}: {
  allPostsData: AboutCollection[];
}) {
  //console.log("allPostsData[0]", allPostsData[0].contentHtml);
  return (
    <div className="flex flex-row">
      <ArrowElbowLeftUp size={32} />
      <div className="w-1/2">
        <div className="flex flex-col m-6 sm:m-24 space-y-10">
          <Intro data={allPostsData[0]}></Intro>
          <Bio data={allPostsData[1]}></Bio>
          <CV data={allPostsData[2]}></CV>
        </div>
      </div>
      <div className="w-1/2 bg-yellow-300">henlo</div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getCollectionData("about");
  return {
    props: {
      allPostsData,
    },
  };
};
