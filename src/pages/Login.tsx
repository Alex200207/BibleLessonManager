import AuthLayout from "../../src/layout/AuthLayout";
import { useLoginValidation } from "../hooks/useLoginValidation";
import { Header } from "../components/Layout/login/Header";
import { Form } from "../components/Layout/login/Form";
import AlexApp from "../assets/image/@AlexApp.png";
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
          className="flex flex-col h-screen"
          style={{
            backgroundImage: `url(${AlexApp})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-md p-4 space-y-4 bg-white shadow-md rounded-lg mx-2 mt-16 md:mt-8">
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
              className="text-center text-gray-500"
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
