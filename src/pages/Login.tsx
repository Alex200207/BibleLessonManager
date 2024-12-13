import AuthLayout from "../../src/layout/AuthLayout";
import { useLoginValidation } from "../hooks/useLoginValidation";
import { Header } from "../components/Layout/login/Header";
import { Form } from "../components/Layout/login/Form";
import { useEffect } from "react";

const Login = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
    validateEmail,
    validatePassword,
    loading,
  } = useLoginValidation();

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <AuthLayout>
      <>
        <Header />
        <div
          className="flex flex-col h-screen bg-black"
          style={{
            background: "linear-gradient(to bottom, #0a0f40, #2569a9)",
          }}
        >


          <div className="absolute top-10 left-10 w-16 h-16 bg-white rounded-full opacity-20 z-0"></div>
          <div className="absolute top-32 right-16 w-8 h-8 bg-white rounded-full opacity-80 z-0"></div>
          <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-white rounded-full opacity-50 z-0"></div>
          <div className="absolute bottom-10 right-10 w-12 h-12 border-2 border-white rounded-full z-0"></div>
          <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-slate-200 rounded-full opacity-70 z-0"></div>
          <div className="flex-grow flex items-center justify-center z-0">


            <div className="w-full max-w-md p-4 space-y-4 bg-slate-50 shadow-md rounded-lg mx-2 mt-16 md:mt-8">
              <h4
                className="text-2xl font-bold text-center text-gray-700"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Bienvenido a BibleLesson
              </h4>
              <p
                className="text-center text-gray-500"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Ingrese sus datos
              </p>
              <Form
                onSubmit={handleSubmit}
                setEmail={setEmail}
                setPassword={setPassword}
                validateEmail={validateEmail}
                validatePassword={validatePassword}
                email={email}
                password={password}
                loading={loading}
              />
            </div>
          </div>
          <footer className="shadow-md py-2 w-full p-4">
            <p
              className="text-center text-zinc-100"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              &copy; 2024 BibleLesson. Todos los derechos reservados.
            </p>
          </footer>
        </div>
      </>
    </AuthLayout>
  );
};

export default Login;
