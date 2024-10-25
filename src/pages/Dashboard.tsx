import {FC, useState } from "react";
import Header from "../components/Layout/Header";
import Aside from "../components/Layout/Aside";




interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard:FC<DashboardProps> = ({children}) => {
  const [isOpened, setIsOpened] = useState(false);


  const toggleAside = () => {
    setIsOpened((prev) => !prev); // tomar el valor previo y cambiarlo viceversa.
  };

  return (
    <>
      <Header toggleAside={toggleAside} />

      <div className="flex transition-all duration-300">
        <Aside isOpened={isOpened} />

        <main
         
          className={`transition-all duration-300 p-5 ${
            isOpened ? "ml-64 w-[calc(100%-16rem)]" : "ml-0 w-full" // si esta abierto se desplaza 64px a la derecha y se le resta 16rem
            // si no esta abierto se queda en 0 y se le resta el ancho total
          }`}
        >
          {children}
          {/* <AppRouter students={students} score={score} group={group} /> */}
          
        </main>
      </div>
    </>
  );
};

export default Dashboard;
