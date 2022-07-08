import Link from "next/link";
import Image from "next/image";

interface RandomButtonProps {
  linkTo: string;
}

const RandomButton = ({ linkTo }: RandomButtonProps) => {
  return (
    <Link href={linkTo}>
      <div className="flex relative py-12">
        <Image width={1308} height={526} src={"/images/random.gif"} />
      </div>
    </Link>
  );
};

export default RandomButton;
