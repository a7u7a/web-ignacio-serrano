import Link from "next/link";

interface FooterProps {
  color: string;
}

const MyFooter = ({ color }: FooterProps) => {
  return (
    <footer
      className={`flex justify-center inset-x-0 bottom-0 ${
        color === "white" ? "bg-white" : "bg-black"
      }`}
    >
      <div
        className={`flex flex-row p-6  ${
          color === "white" ? "text-black" : "text-white"
        }`}
      >
        <Link href={"https://www.instagram.com/ignacioserranol/"}>
          <div className="underline cursor-pointer">ignacioserrano.com</div>
        </Link>
        <a className="ml-2"> - 2022</a>
      </div>
    </footer>
  );
};

export default MyFooter;
