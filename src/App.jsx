import Inicio from './components/Inicio/Inicio'
import NavBar from './components/NavBar/NavBar'
import CargaProd from './components/CargaProd/CargaProd'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Footer from './components/Footer/Footer'
import CartView from './components/CartView/CartView'
import Checkout from './components/Checkout/Checkout'
import LoginForm from './components/LoginForm/LoginForm'
import { createContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import RegisterForm from './components/RegisterForm/RegistrerForm'

export const Contexto = createContext()

function App() {
  const [contextValue, setContextValue] = useState(0)
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    console.debug(userData)
  }

  return (
    <>
      <BrowserRouter>
      <CartProvider>
        <NavBar user={user}/>
        <Routes>
          <Route path='/' element={<Inicio user={user}/>} />
          <Route path='/productos' element={<ItemListContainer/>}/>
          <Route path='/productos/:precio' element={<ItemListContainer/>}/>
          <Route path='/productos/:categoria' element={<ItemListContainer/>}/>
          <Route path='/cargaProductos' element={<CargaProd />} />
          <Route path="/detalle/:id" element={<ItemDetailContainer />} />
          <Route path='/cart' element={<CartView />} />
          <Route path='/checkout' element={<Checkout user={ user }/>} />
          <Route path='/login' element={<LoginForm onLogin={handleLogin} />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='*' element={<h1>ERROR 404 Not found</h1>}/>
        </Routes>
        <Footer />
        </CartProvider>
      </BrowserRouter>
    </>
  )
}

export default App
