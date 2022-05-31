import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";

import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import DateEl from "../components/date";
import { GetStaticProps } from 'next'

export default function Home({ allPostsData }: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p>
          Web en proceso de construcción.
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this in{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section>
        <h2 >Blog</h2>
        <ul >
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small >
                <DateEl dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
