import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
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
  const aboutPost = allPostsData.filter((item) => item.id === "about")[0];
  const bioPost = allPostsData.filter((item) => item.id === "bio")[0];
  const cvPost = allPostsData.filter((item) => item.id === "cv")[0];
  
  return (
    <div>
      <Head>
        <title>{pageName}</title>
      </Head>
    
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, contentHtml }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <DateEl dateString={date} />
              </small>
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
