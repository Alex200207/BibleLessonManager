
import { Link } from "react-router-dom";
import RoleList from "../components/Layout/Roles/RoleList";
import { IoMdPersonAdd } from "react-icons/io";



const RolesPage: React.FC = () => {
  

  



  return (
    <div className="pt-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold p-4">Roles</h1>
        <Link to="/addRole">
          <button className="rounded transparent text-black px-4 py-2">
          <IoMdPersonAdd  className="h-10 w-10"/>
          </button>
        </Link>
      </div>
   
      <RoleList  />
    </div>
  );
};

export default RolesPage;
