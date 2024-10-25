
import AppRouter from '../src/routes/AppRouter'
import { AuthProvider } from '../src/utils/AuthProvider'

const App = () => {
  return (
   
      <AuthProvider>
        <AppRouter /*students={[]} score={[]} group={[]}*/ /> 
      </AuthProvider>   
  
  )
}

export default App