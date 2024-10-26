import { FC, useState } from "react";
import Header from "../components/Layout/Header";
import Aside from "../components/Layout/Aside";

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: FC<DashboardProps> = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleAside = () => {
    setIsOpened((prev) => !prev); // Cambia el estado del Aside
  };

  return (
    <>
      <Header toggleAside={toggleAside} />

      <div className="flex transition-all duration-300">
        <Aside isOpened={isOpened} />

        <main
          className={`transition-all duration-300 p-5 ${
            isOpened ? "ml-42 lg:ml-64" : "ml-0"
          }`}
          style={{
            // Mantiene el ancho completo y hace que el main no se desplace a la izquierda
            width: isOpened ? "100%" : "100%",
            position: isOpened ? "fixed" : "relative", // Fijo al abrir el Aside
            zIndex: 0, // Asegúrate de que el contenido no esté detrás del Aside
          }}
        >
          <div className="w-full overflow-x-auto">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
