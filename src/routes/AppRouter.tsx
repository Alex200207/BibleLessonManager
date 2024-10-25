import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "../../src/utils/ProtectedRoutes";
import Login from "../pages/Login";
import Table from "../components/Layout/Table";
import { useStudent } from "../hooks/useStudent";
import Register from "../pages/Register";



const AppRouter = () => {
  const { students ,score, group} = useStudent();
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path='register' element={<Register/>}/>

      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<h1>Hola</h1>} />
        <Route path="/kid" element={<Table students={students}  score={score} group={group}/>} />
        <Route path="/group" element={<h2>Hola2</h2>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
