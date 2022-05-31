import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { getCollectionData } from "../lib/posts";
import Link from "next/link";
import DateEl from "../components/date";
import { GetStaticProps } from "next";
import { remark } from 'remark'
import html from 'remark-html'

const pageName = "About";

export default function About({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
    contentHtml:string
  }[];
}) {
  return (
    <div>
      <Head>
        <title>{pageName}</title>
      </Head>
      <section >
        <h2>About</h2>
        <ul>
          {allPostsData.map(({ id, date, title, contentHtml }) => (
            <li key={id}>
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </li>
          ))}
        </ul>
      </section>
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
