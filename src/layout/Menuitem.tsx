import { Link } from 'react-router-dom';

interface MenuItemProps {
  title: string;
  icon: string;
  path: string;
}

const Menuitem = ({ title, icon, path }: MenuItemProps) => {
  return (
    <li>
      <Link to={path}>
        <i className="material-icons-outlined">{icon}</i>
        {title}
      </Link>
    </li>
  );
};

export default Menuitem;
