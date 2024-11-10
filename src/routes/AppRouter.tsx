import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "../../src/utils/ProtectedRoutes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StudentTable from "../components/Layout/students/StudentTable";
import Lesson from "../components/Layout/lesson/Lessons";
import About from "../pages/About";
import RolesPage from "../pages/RolesPage";
import RoleForm from "../components/Layout/Roles/RoleForm";
import GroupTable from '../components/Layout/group/GroupTable'
import Home from '../components/Layout/home/Home'
import UserTable from "../components/Layout/users/UserTable";




const AppRouter = () => {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About/>} />
      <Route path='register' element={<Register/>}/>


      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home/>} />
        <Route path="/kid" element={<StudentTable/>} />
        <Route path="/lesson" element={<Lesson/>} />
        <Route path='/teacher' element={<h1>maestros</h1>}/>
        <Route path="/group" element={<GroupTable/>} />  
        <Route path='/role' element={<RolesPage/>}/>
        <Route path='/addRole' element={<RoleForm onSave={() => { /* handle save */ }} />}/>    
        <Route path='/users' element={<UserTable/>}/>  
      </Route>
    </Routes>
  );
};

export default AppRouter;
