import Link from "next/link";
import Image from "next/image";

interface HomeLinkProps {
  href: string;
  src: string;
}

const HomeLink = ({ href, src }: HomeLinkProps) => {
  return (
    <Link href={href}>
      <div className="w-96 relative">
        <Image
          className="cursor-pointer"
          objectFit="contain"
          src={src}
          layout="fill"
        />
      </div>
    </Link>
  );
};

export default HomeLink;
