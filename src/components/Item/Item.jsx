import { Link } from "react-router-dom"

const Item = ({ id, condition, thumbnail, price, title }) => {
    return (
        <>
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

export default Item