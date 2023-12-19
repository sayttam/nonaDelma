/* import { useState } from 'react'; */
import NavBar from './components/NavBar/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Footer from './components/Footer/Footer'

function App() {
/*   const [counter, setCounter] = useState(0)

  let contador = ()=> {
    setCounter(counter + 1)
  } */

  return (
    <>
      <NavBar />
      <ItemListContainer saludo="¡Bienvenido!" />
      <Footer />
      {/* <div>{contador}</div> */}
      {/* <button onClick={contador}>Contar</button> */}
      {/* <button onClick={setCounter(0)}>Resetear</button> */}
    </>
  )
}

export default App
