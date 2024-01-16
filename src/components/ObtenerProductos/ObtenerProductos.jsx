import ItemCount from '../ItemCount/ItemCount'
import './ObtenerProductos.css'
import { useState, useEffect } from "react"
import { ListGroup, Card, Row, Col } from "react-bootstrap"
import { Link } from 'react-router-dom'

const ObtenerProductos = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    try {
      fetch("https://api.mercadolibre.com/sites/MLA/search?q=lanas")
        .then((response) => response.json())
        .then((json) => setProductos(json.results))
    } catch (error) {
      console.error(error)
    }
  }, [])

  if (productos.length === 0) {
    return <p>Cargando...</p>
  }
  

  return (
    <>
      <Row className='productos'>
        {productos.map((prod) => (
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
                    <ItemCount inicial={1} stock={100} onAdd={(cantidad) => console.log('Cantidad agregada: ' + cantidad)}/>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ObtenerProductos