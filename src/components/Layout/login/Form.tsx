import { Link } from "react-router-dom";

interface FormProps {
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  validatePassword: () => boolean;
  validateEmail: () => boolean;
  loading: boolean; // Cambiado para ser un booleano
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
    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
      <div>
        <label htmlFor="inputEmailAddress" className="block mb-1 text-sm font-medium text-gray-600">
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
        <label htmlFor="inputChoosePassword" className="block mb-1 text-sm font-medium text-gray-600">
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
          <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
          <span className="ml-2 text-sm text-gray-600">Recordarme</span>
        </label>
        <Link to="#" className="text-sm text-indigo-600 hover:underline">
          ¿Olvidaste tu cuenta?
        </Link>
      </div>

      <div>

        {/*tuve que investigar esto...   :'(     */}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={loading} // Deshabilita el botón si está cargando
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2 animate-spin text-white" // Ruedita de carga
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
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
        <Link to="/register" className="text-sm text-indigo-600 hover:underline pointer-events-none opacity-50"
        >
          Registrarse
        </Link>
      </div>
    </form>
  );
};

export { Form };
