import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "../../src/utils/ProtectedRoutes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StudentTable from "../components/Layout/students/StudentTable";
import Lesson from "../components/Layout/lesson/Lessons";
import About from "../pages/About";
import RolesPage from "../pages/RolesPage";
import RoleForm from "../components/Layout/Roles/RoleForm";
import GroupTable from "../components/Layout/group/GroupTable";
import Home from "../components/Layout/home/Home";
import UserTable from "../components/Layout/users/UserTable";
import { useAuth } from "../utils/AuthProvider";
import Profile from "../components/Layout/users/Profile";
import EditLesson from "../components/Layout/lesson/EditLesson";
import AddLessonModal from "../components/Layout/lesson/AddLessonModal";
import EvaluationCreator from "../components/EvaluationCreator";



const AppRouter: React.FC = () => {
  const { role } = useAuth(); // Obtenemos el rol del usuario

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="register" element={<Register />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/kid" element={<StudentTable />} />
        <Route path="/evaluate" element={<EvaluationCreator />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route
          path="/editLesson"
          element={<EditLesson  />}
        />
        <Route path="/addLesson" element={<AddLessonModal/>} />
        <Route path="/group" element={<GroupTable />} />
        <Route path="/profile" element={<Profile />}></Route>

        {/* Renderizar solo si el rol es admin */}
        {role === "admin" && (
          <>
            <Route path="/role" element={<RolesPage />} />
            <Route path="/addRole" element={<RoleForm onSave={() => {}} />} />
            <Route path="/users" element={<UserTable />} />
          </>
        )}
      </Route>
    </Routes>
  );
};

export default AppRouter;
