import Inicio from './components/Inicio/Inicio'
import NavBar from './components/NavBar/NavBar'
import CargaProd from './components/CargaProd/CargaProd'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Footer from './components/Footer/Footer'
import CartView from './components/CartView/CartView'
import Checkout from './components/Checkout/Checkout'
import { createContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'

export const Contexto = createContext()

function App() {
  const [contextValue, setContextValue] = useState(0)

  return (
    <>
      <BrowserRouter>
      <CartProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/productos' element={<ItemListContainer/>}/>
          <Route path='/productos/:precio' element={<ItemListContainer/>}/>
          <Route path='/productos/:categoria' element={<ItemListContainer/>}/>
          <Route path='/cargaProductos' element={<CargaProd />} />
          <Route path="/producto/:id" element={<ItemDetailContainer />} />
          <Route path='/cart' element={<CartView />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
        <Footer />
        </CartProvider>
      </BrowserRouter>
    </>
  )
}

export default App
