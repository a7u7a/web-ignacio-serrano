import Link from "next/link";

const Home = () => {
  return (
    <>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/sensiblog">
        <a>Sensiblog</a>
      </Link>
      <Link href="/posible">
        <a>Posible</a>
      </Link>
      <Link href="/random">
        <a>Random</a>
      </Link>
    </>
  );
};

export default Home;
