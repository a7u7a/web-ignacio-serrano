import Link from "next/link";

interface NavLinkProps {
  url: string;
  text: string;
}
/**
 * Only use to be able to style link colors and use Link component
 */
const NavLink = ({ url, text }: NavLinkProps) => {
  return (
    <Link href={encodeURI(url)}>
      <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
        {text}
      </a>
    </Link>
  );
};

export default NavLink;
