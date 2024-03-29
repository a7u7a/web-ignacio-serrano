import Link from "next/link";

interface NavLinkProps {
  url: string;
  text: string;
}
/**
 * Only used to be able to style link colors and use Link component
 * Tried to style link but conflicted with 'prose'
 */
const NavLink = ({ url, text }: NavLinkProps) => {
  return (
    <Link href={encodeURI(url)}>
      <a>
        {text}
      </a>
    </Link>
  );
};

export default NavLink;
