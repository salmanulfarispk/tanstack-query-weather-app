import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Layout } from './components/Layout'
import { ThemeProvider } from './context/theme-provider'
import WeatherDashboard from './pages/Weather-dashboard'
import Citypage from './pages/City-page'
import { Toaster } from "./components/ui/sonner";



const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true,v7_relativeSplatPath: true}}>
      <ThemeProvider defaultTheme="dark">
      <Layout>
        <Routes>

          <Route path='/'  element={<WeatherDashboard />} />
          <Route path='/city/:cityName'  element={<Citypage />} />
        </Routes>
     </Layout>
     <Toaster richColors />
      </ThemeProvider>
     
    </BrowserRouter>
  )
}

export default App