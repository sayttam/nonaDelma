import Inicio from './components/Inicio/Inicio'
import NavBar from './components/NavBar/NavBar'
import CargaProd from './components/CargaProd/CargaProd'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Footer from './components/Footer/Footer'
import DetalleProd from './components/DetalleProd/DetalleProd'
import ObtenerProductos from './components/ObtenerProductos/ObtenerProductos'
import { createContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

export const Contexto = createContext()

function App() {
  const [contextValue, setContextValue] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Contexto.Provider value={{ contextValue, setContextValue }}>
        <NavBar />
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/productos' element={<ItemListContainer/>}/>
          <Route path='/productos/:precio' element={<ItemListContainer/>}/>
          <Route path='/productos/:categoria' element={<ItemListContainer/>}/>
          <Route path='/cargaProductos' element={<CargaProd />} />
          <Route path="/producto/:id" element={<DetalleProd />} />
        </Routes>
        <Footer />
        </Contexto.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
