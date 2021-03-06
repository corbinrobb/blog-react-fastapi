import { NavLinksType } from "../../types";

type MenuProps = {
  navLinks: NavLinksType;
  className: string;
};

const Menu: React.FC<MenuProps> = ({ navLinks, className }) => {
  const navLinkStyle = `px-10 py-2 text-lg text-white border hover:border-b-2 border-green-50 border-opacity-0 active:text-green-100 hover:border-opacity-50 hover:shadow active:border-b-0 active:border-opacity-0 active:shadow-inner active:bg-green-600 active:bg-opacity-30 rounded cursor-pointer`;

  return <div className={className}>{navLinks(navLinkStyle)}</div>;
};

export default Menu;
