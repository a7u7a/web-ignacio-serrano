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
      <a >
        {text}
      </a>
    </Link>
  );
};

export default NavLink;
