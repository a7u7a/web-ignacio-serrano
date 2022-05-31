import Head from "next/head";
import { getCollectionData } from "../lib/posts";
import Link from "next/link";
import { GetStaticProps } from "next";
import { AboutCollection } from "../models/aboutCollection.models";
import Intro from "../components/intro";
import Bio from "../components/bio";
import CV from "../components/cv";

import utilStyles from "../styles/utils.module.css";

const pageName = "About";

export default function About({
  allPostsData,
}: { allPostsData: AboutCollection[] }) {
  console.log("allPostsData[0]", allPostsData[0]);
  return (
    <div className="flex flex-col m-8">
      <Intro data={allPostsData[0]}></Intro>
      <Bio data={allPostsData[1]}></Bio>
      <CV data={allPostsData[2]}></CV>
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
