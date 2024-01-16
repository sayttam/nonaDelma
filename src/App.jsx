import Inicio from './components/Inicio/Inicio'
import NavBar from './components/NavBar/NavBar'
import CargaProd from './components/CargaProd/CargaProd'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Footer from './components/Footer/Footer'
import DetalleProd from './components/DetalleProd/DetalleProd'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/productos' element={<ItemListContainer />} />
          <Route path='/cargaProductos' element={<CargaProd />} />
          <Route path="/producto/:id" element={<DetalleProd />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
