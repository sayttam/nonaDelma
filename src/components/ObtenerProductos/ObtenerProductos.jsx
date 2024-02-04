import './ObtenerProductos.css'
import { useState, useEffect, useContext } from 'react'
import { ListGroup, Card, Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { Contexto } from '../../App'
import { db } from '../../services/firebase/firebaseConfig'
import { doc, getDocs, collection, query, where } from 'firebase/firestore'


const ObtenerProductos = ({ saludo }) => {
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

console.log('Categoria Seleccionada:', categoria)
console.log('Productos Filtrados por Categoria:', productosFiltradosCategoria)
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
    <Row className='productos'>
      {productosFiltradosCategoria.map((prod) => (
        <Col key={prod.id} xs={12} sm={6} md={4} lg={3}>
          <Card style={{ marginBottom: '15px', width: '250px' }}>
            <Card.Img variant='top' src={prod.thumbnail} />
            <Card.Body>
              <Card.Title>{prod.title}</Card.Title>
              <Card.Text>{prod.condition}</Card.Text>
              <Card.Text>
                <Link to={`/producto/${prod.id}`}>Detalle</Link>
              </Card.Text>
            </Card.Body>
            <ListGroup className='list-group-flush'>
              <ListGroup.Item>${prod.price}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      ))}
    </Row>
  </>
)
}

export default ObtenerProductos