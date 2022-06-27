import Link from "next/link";
const MyFooter = () => {
  return (
    <footer className="flex justify-center inset-x-0 bottom-0  bg-black">
      <div className="flex flex-row p-6 text-white">

        <Link
          href={"https://www.instagram.com/ignacioserranol/"}
          >
            <div className="underline cursor-pointer">

          ignacioserrano.com
            </div>
        </Link>
        <a className="ml-2"> - 2022</a>
            </div>
      
    </footer>
  );
};

export default MyFooter;
