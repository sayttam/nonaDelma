import ItemCount from '../ItemCount/ItemCount'
import './ObtenerProductos.css'
import { useState, useEffect } from "react"
import { ListGroup, Card, Row, Col } from "react-bootstrap"
import { Link, useParams } from 'react-router-dom'

const ObtenerProductos = ({saludo}) => {
  const [productos, setProductos] = useState([])
  const { precio } = useParams()


  useEffect(() => {
    const obtenerProd = async () => {
      try {
        const datos = await obtenerDatosDeLaAPI()
        setProductos(datos)
      } catch (error) {
        console.log(error)
      }
    }

    obtenerProd()
  }, [])

  const obtenerDatosDeLaAPI = () => {
    return new Promise((resolve, reject) => {
      fetch("https://api.mercadolibre.com/sites/MLA/search?q=lanas")
        .then((response) => response.json())
        .then((json) => resolve(json.results))
        .catch((error) => reject(error))
    })
  }

  const filtroPrecio = productos.slice()

  const productosFiltrados =
    precio === "menor" ? filtroPrecio.sort((a, b) => a.price - b.price)
      : precio === "mayor" ? filtroPrecio.sort((a, b) => b.price - a.price)
      : productos

  if (productos.length === 0) {
    return <p>Cargando...</p>
  }


  return (
    <>
      <div className="filtro">
      <h2>{saludo}</h2>
        <Link to="/productos">Todos</Link>
        <Link to="/productos/menor">Menor precio</Link>
        <Link to="/productos/mayor">Mayor precio</Link>
      </div>
      <Row className='productos'>
        {productosFiltrados.map((prod) => (
          <Col key={prod.id} xs={12} sm={6} md={4} lg={3}>
            <Card style={{ marginBottom: "15px", width: "250px" }}>
              <Card.Img variant="top" src={prod.thumbnail} />
              <Card.Body>
                <Card.Title>{prod.title}</Card.Title>
                <Card.Text>
                  {prod.condition}
                </Card.Text>
                <Card.Text>
                  <Link to={`/producto/${prod.id}`}>Detalle</Link>
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>${prod.price}</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <ItemCount inicial={1} stock={100} onAdd={(cantidad) => console.log('Cantidad agregada: ' + cantidad)} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default ObtenerProductos