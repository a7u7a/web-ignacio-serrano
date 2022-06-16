import Link from "next/link";
const MyFooter = () => {
  return (
    <div className="flex justify-center inset-x-0 bottom-0  border-t border-white">
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
      
    </div>
  );
};

export default MyFooter;
