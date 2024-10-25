import AuthLayout from "../../src/layout/AuthLayout";
import { useLoginValidation } from "../hooks/useLoginValidation";
import { Header } from "../components/Layout/login/Header";
import { Form } from "../components/Layout/login/Form";
import AlexApp from '../assets/image/@AlexApp.png'

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

  return (
    <AuthLayout>
      <>
        <Header />
        <div
          className="flex items-center justify-center h-screen"
          style={{
            backgroundImage: `url(${AlexApp})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
            <h4 className="text-2xl font-bold text-center text-gray-700">
              Bienvenido a AlexApp
            </h4>
            <p className="text-center text-gray-500">Ingrese tus datos</p>
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
      </>
    </AuthLayout>
  );
};

export default Login;
