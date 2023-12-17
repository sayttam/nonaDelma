import NavBar from './assets/components/NavBar/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ItemListContainer from './assets/components/ItemListContainer/ItemListContainer';
import Footer from './assets/components/Footer/Footer'

function App() {

  return (
    <>
      <NavBar />
      <ItemListContainer saludo="Bienvenido" />
      <Footer />
    </>
  )
}

export default App
