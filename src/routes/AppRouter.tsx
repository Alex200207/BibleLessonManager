import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "../../src/utils/ProtectedRoutes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StudentTable from "../components/Layout/students/StudentTable";
import Lesson from "../components/Layout/lesson/Lessons";
import About from "../pages/About";
import RolesPage from "../pages/RolesPage";
import RoleForm from "../components/Layout/Roles/RoleForm";




const AppRouter = () => {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About/>} />
      <Route path='register' element={<Register/>}/>


      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<h1>Hola</h1>} />
        <Route path="/kid" element={<StudentTable/>} />
        <Route path="/lesson" element={<Lesson/>} />
        <Route path='/teacher' element={<h1>maestros</h1>}/>
        <Route path="/group" element={<h2>Hola2</h2>} />  
        <Route path='/role' element={<RolesPage/>}/>
        <Route path='/addRole' element={<RoleForm onSave={() => { /* handle save */ }} />}/>      
      </Route>
    </Routes>
  );
};

export default AppRouter;
