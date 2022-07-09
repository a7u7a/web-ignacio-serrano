import Link from "next/link";

interface FooterProps {
  color: string;
}

const MyFooter = ({ color }: FooterProps) => {
  let bgColor;
  let txtColor;
  if (color === "white") {
    bgColor = "bg-white";
    txtColor = "text-slate-800";
  }
  if (color === "black") {
    bgColor = "bg-black";
    txtColor = "text-slate-300";
  }
  if (color === "") {
    bgColor = "";
    txtColor = "text-slate-800";
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
