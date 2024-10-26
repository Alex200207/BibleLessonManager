import { FC, useState } from "react";
import Header from "../components/Layout/Header";
import Aside from "../components/Layout/Aside";

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: FC<DashboardProps> = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleAside = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <>
      <Header toggleAside={toggleAside} />

      <div className="flex transition-all duration-300">
        {/* Aside con posición fija solo en móviles */}
        <Aside
          isOpened={isOpened}
          style={{
            position: isOpened ? "fixed" : "relative", // Fijo cuando está abierto
            top: 0,
            left: 0,
            height: "100vh",
            zIndex: 20, // Elevado sobre el main
            width: isOpened ? "16rem" : "0", // Controla el ancho cuando se abre
          }}
        />

        <main
          className={`transition-all duration-300 p-5 ${
            isOpened ? "ml-0 lg:ml-64" : "ml-0"
          }`}
          style={{
            marginLeft: isOpened && window.innerWidth >= 1024 ? "16rem" : "0", // Solo aplica el margen en pantallas grandes
            width: "100%",
            position: "relative",
            zIndex: 0,
          }}
        >
          <div className="w-full overflow-x-auto">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
