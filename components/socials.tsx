import Link from "next/link";

const SocialAbout = () => {
  return (
    <div className="w-full flex flex-col mt-10 underline underline-offset-1 text-center font-semibold">
      <Link href="mailto:ignacioserranocuarto@gmail.com">Email</Link>
      <Link href="https://www.instagram.com/ignacioserranol/">Instagram</Link>
    </div>
  );
};

export default SocialAbout;
