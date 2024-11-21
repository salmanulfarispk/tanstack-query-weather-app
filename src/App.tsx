import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Layout } from './components/Layout'
import { ThemeProvider } from './context/theme-provider'
import WeatherDashboard from './pages/Weather-dashboard'
import Citypage from './pages/City-page'


const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
      <Layout>
        <Routes>

          <Route path='/'  element={<WeatherDashboard />} />
          <Route path='/city/:cityName'  element={<Citypage />} />



          


        </Routes>
     </Layout>
      </ThemeProvider>
     
    </BrowserRouter>
  )
}

export default App