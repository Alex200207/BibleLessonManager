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

      <div className="flex transition-all duration-300 ">
        <Aside
          isOpened={isOpened}
          style={{
            position: isOpened ? "fixed" : "relative",
            top: 0,
            left: 0,
            height: "100vh",
            zIndex: 20,
            width: isOpened ? "16rem" : "0",
          }}
        />

        <main
          className={`transition-all duration-300 py-10 px-2 ${
            isOpened ? "ml-0 lg:ml-64" : "ml-0"
          }`}
          style={{
            marginLeft: isOpened && window.innerWidth >= 1024 ? "16rem" : "0",
            width: "100%",
            position: "relative",
            marginTop: "1rem", // Ajusta este valor según sea necesario
            
          }}
        >
          <div className="w-full overflow-x-auto">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
