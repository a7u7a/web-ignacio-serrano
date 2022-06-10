import HomeLink from "../components/homeLink";

const Home = () => {
  return (
    <>
      <div className="flex flex-col w-screen h-screen p-4 space-y-12 md:space-y-0 my-16 md:my-4">
        <div className="flex flex-row h-1/3 justify-center">
          <HomeLink src={"/images/about.png"} href={"/about"} />
        </div>
        <div className="flex flex-row h-1/3 justify-center md:hidden">
          <HomeLink src={"/images/sensiblog.png"} href={"/sensiblog"} />
        </div>
        <div className="flex flex-row h-1/3 justify-center md:hidden">
          <HomeLink src={"/images/posible.png"} href={"/posible"} />
        </div>
        <div className="hidden flex-row h-1/3 justify-center space-x-52 md:flex">
          <HomeLink src={"/images/sensiblog.png"} href={"/sensiblog"} />
          <HomeLink src={"/images/posible.png"} href={"/posible"} />
        </div>
        <div className="flex flex-row h-1/3 justify-center">
          <HomeLink src={"/images/random.png"} href={"/random"} />
        </div>
      </div>
    </>
  );
};

export default Home;
