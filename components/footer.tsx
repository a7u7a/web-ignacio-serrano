import Link from "next/link";

interface FooterProps {
  color: string;
}

const MyFooter = ({ color }: FooterProps) => {
  let bgColor;
  if (color === "white") {
    bgColor = "bg-white";
  }
  if (color === "black") {
    bgColor = "bg-black";
  }
  if (color === "") {
    bgColor = "";
  }
  return (
    <footer
      className={`flex justify-center inset-x-0 bottom-0 z-30 w-full ${bgColor}`}
    >
      <div
        className={`flex flex-row p-6 text-sm ${
          color === "white" ? "text-slate-800" : "text-slate-300"
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
