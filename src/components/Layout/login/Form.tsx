import { Link } from "react-router-dom"

interface FormProps{
    email: string
    password: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    setPassword: React.Dispatch<React.SetStateAction<string>>
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
    validatePassword: () => boolean
    validateEmail: () => boolean
}


const Form = ({setEmail, setPassword , onSubmit, validateEmail, validatePassword,email,password}: FormProps) : JSX.Element => {

    return (

        <form  className="mt-8 space-y-6 " onSubmit={onSubmit}>
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
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Acceder
          </button>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">¿No tienes cuenta? </span>
          <Link to="/register" className="text-sm text-indigo-600 hover:underline">
            Registrarse
          </Link>
        </div>
      </form>
    )
}

export {
    Form
}