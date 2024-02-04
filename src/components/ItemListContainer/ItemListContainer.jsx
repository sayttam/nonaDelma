import './ItemListContainer.css'
import '../ItemList/ItemList'
import { useState, useEffect, useContext } from 'react'
import { ListGroup, Card, Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { Contexto } from '../../App'
import { db } from '../../services/firebase/firebaseConfig'
import { doc, getDocs, collection, query, where } from 'firebase/firestore'
import ItemList from '../ItemList/ItemList'



const ItemListContainer = ({ saludo }) => {
  const [productos, setProductos] = useState([])
  const { precio, categoria: categoriaParam } = useParams()
  const [categoria, setCategoria] = useState('')
  const { contextValue, setContextValue } = useContext(Contexto)
  const { productId } = useParams()

   const obtenerDatosDeTelas = () => {
    return new Promise((resolve, reject) => {
      fetch('https://api.mercadolibre.com/sites/MLA/search?q=telas')
        .then((response) => response.json())
        .then((json) => resolve(json.results))
        .catch((error) => reject(error))
    })
  }

  const obtenerDatosDeLanas = async () => {
    const productDocument = collection(db, 'productos-nonadelma')
    try {
      const queryDocumentSnapshot = await getDocs(productDocument)
      console.debug(queryDocumentSnapshot.data)
    } catch (error) {
      console.error('Error obteniendo productos: ',error.message, error.stack)
    }
  };

  const obtenerProd = async () => {
    const datosTelas = await obtenerDatosDeTelas()
    const datosLanas = await obtenerDatosDeLanas()

    const productosCombinados = [...datosLanas, ...datosTelas]
    setProductos(productosCombinados)
  }

  useEffect(() => {
    obtenerProd();
  }, [productId]);

  const aplicarFiltroCategoria = (categoria) => {
    setCategoria(categoria);
  };
const filtroPrecio = productos.slice()

const productosFiltrados =
  precio === 'menor'
    ? filtroPrecio.sort((a, b) => a.price - b.price)
    : precio === 'mayor'
      ? filtroPrecio.sort((a, b) => b.price - a.price)
      : productos

const productosFiltradosCategoria =
  categoria === 'telas'
    ? productosFiltrados.filter((prod) => prod.category_id === 'MLA413596')
    : categoria === 'lanas'
      ? productosFiltrados.filter((prod) => prod.category_id === 'MLA95393')
      : productosFiltrados

if (productos.length === 0) {
  return <p className='cargando'>Cargando...</p>
}

return (
  <>
    <div className='filtro'>
      <h2>{saludo}</h2>
      <Link to='/productos' onLoad={() => aplicarFiltroCategoria('')} onClick={() => aplicarFiltroCategoria('')}>Todos</Link>
      <Link to='/productos/telas' onClick={() => aplicarFiltroCategoria('telas')}>Telas</Link>
      <Link to='/productos/lanas' onClick={() => aplicarFiltroCategoria('lanas')}>Lanas</Link>
      <br />
      <Link to='/productos/menor'>Menor precio</Link>
      <Link to='/productos/mayor'>Mayor precio</Link>
    </div>
    <ItemList products={productosFiltradosCategoria}/>
    
  </>
)
}


export default ItemListContainer