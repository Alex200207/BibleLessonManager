import { Link } from "react-router-dom";

interface FormProps {
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  validatePassword: () => boolean;
  validateEmail: () => boolean;
  loading: boolean; 
}

const Form = ({
  setEmail,
  setPassword,
  onSubmit,
  validateEmail,
  validatePassword,
  email,
  password,
  loading,
}: FormProps): JSX.Element => {
  return (
    <form className="mt-8 space-y-6 " onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="inputEmailAddress"
          className="block mb-1 text-sm font-medium text-gray-600"
        >
          Ingresa usuario
        </label>
        <input
          type="email"
          id="inputEmailAddress"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
        />
      </div>
      <div>
        <label
          htmlFor="inputChoosePassword"
          className="block mb-1 text-sm font-medium text-gray-600"
        >
          Contraseña
        </label>
        <input
          type="password"
          id="inputChoosePassword"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Contraseña"
          value={password}
          onBlur={validatePassword}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-gray-600">Recordarme</span>
        </label>
        <Link to="#" className="text-sm text-indigo-600 hover:underline">
          ¿Olvidaste tu cuenta?
        </Link>
      </div>

      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={loading} // Deshabilita el botón si está cargando
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="w-6 h-6 mr-2 animate-spin text-white" // Biblia giratoria
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 2H14C15.1 2 16 2.9 16 4V20C16 21.1 15.1 22 14 22H4C2.9 22 2 21.1 2 20V4C2 2.9 2.9 2 4 2ZM10 4V20H4V4H10ZM14 4V20H12V4H14ZM18 6H20C21.1 6 22 6.9 22 8V16C22 17.1 21.1 18 20 18H18V6Z" />
              </svg>
              Cargando...
            </div>
          ) : (
            "Acceder"
          )}
        </button>
      </div>

      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600">¿No tienes cuenta? </span>
        <p>
          Solicita una Cuenta
          <a className="text-sky-500" href="3"> Clik aqui</a>
        </p>
      </div>
    </form>
  );
};

export { Form };
