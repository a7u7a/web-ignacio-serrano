import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { getAllPostsSlugs } from "../lib/posts";
import HomeLink from "../components/homeLink";
import CajaRemedio from "../components/cajaRemedio";

const siteTitle = "Ignacio Serrano Web";

interface HomeProps {
  allPostsSlugs: string[];
}

const Home = ({ allPostsSlugs }: HomeProps) => {
  const randomLink =
    allPostsSlugs[Math.floor(Math.random() * allPostsSlugs.length)];
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="flex flex-col w-screen h-screen p-4 space-y-12 md:space-y-0 my-16 md:my-4">
        <div className="relative flex flex-row h-1/3 justify-center">
          <Link href={"/about"}>
            <div className="w-96 cursor-pointer">
              <CajaRemedio />
            </div>
          </Link>
        </div>
        <div className="flex flex-row h-1/3 justify-center ">
          <HomeLink src={"/images/posible2d.png"} href={"/posible"} />
        </div>
        <div className="flex flex-row h-1/3 justify-center rotate-12">
          
          <HomeLink src={"/images/sensiblog_w.gif"} href={"/sensiblog"} />
        </div>
        <div className="flex flex-row h-1/3 justify-center">
          <HomeLink src={"/images/random.gif"} href={randomLink} />
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPostsSlugs = getAllPostsSlugs();
  return {
    props: {
      allPostsSlugs,
    },
  };
};

export default Home;
