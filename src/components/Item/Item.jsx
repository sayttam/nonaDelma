import { Link } from "react-router-dom"
import { ListGroup, Card, Col } from 'react-bootstrap'
import { useContext } from 'react'

const Item = ({ id, thumbnail, price, title }) => {
    return (
        <>

        <Col key={id} xs={12} sm={6} md={4} lg={3}>
          <Card style={{ marginBottom: '15px', width: '250px' }}>
            <Card.Img variant='top' src={thumbnail} />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>
                <Link to={`/producto/${id}`}>Detalle</Link>
              </Card.Text>
            </Card.Body>
            <ListGroup className='list-group-flush'>
              <ListGroup.Item>${price}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        </>
    )
}

export default Item