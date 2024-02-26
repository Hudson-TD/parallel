import { Link } from "react-router-dom";

type NavigationLinkProps = {
  to: string;
  background: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};
export default function NavigationLink(props: NavigationLinkProps) {
  return (
    <Link
      onClick={props.onClick}
      className="nav-link"
      to={props.to}
      style={{ background: props.background, color: props.textColor }}
    >
      {props.text}
    </Link>
  );
}
