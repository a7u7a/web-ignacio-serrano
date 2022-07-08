import Link from "next/link";

const SocialAbout = () => {
  return (
    <div className="w-full flex flex-col mt-10 underline underline-offset-1 text-center">
      <div className="flex justify-center">
        <div className="w-min hover:text-violeta">
          <Link href="mailto:ignacioserranocuarto@gmail.com">Email</Link>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-min hover:text-violeta">
          <Link href="https://www.instagram.com/ignacioserranol/">
            Instagram
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SocialAbout;
