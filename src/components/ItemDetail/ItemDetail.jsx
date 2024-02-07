import ItemCount from '../ItemCount/ItemCount'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap'
import './ItemDetail.css'
import { useCart } from '../../context/CartContext'

const ItemDetail = ({ id, title, thumbnail, price, available_quantity, cantidad }) => {
    const { cart, addItem, getProductQuantity } = useCart()
    const {productId} = useParams()

    const handleOnAdd = (cantidad) => {
        
        const objProductToAdd = {
            id,
            title, 
            price, 
            cantidad
        }
        addItem(objProductToAdd)
    }

    const productQuantity = getProductQuantity(productId)

    return (
        
        <Container style={{ marginTop: '70px' }} className='contenedorDetalle'>
        <Link to={`../productos`} className='botonAtras'>Atras</Link>
        <h2>Detalle</h2>

        <Row className='filaContDet'>
            <Col xs={12} md={6}>
                <Card>
                    <Card.Body>
                        <h3>{title}</h3>
                        <img src={thumbnail} alt="" />
                        <Card.Title>Precio: {price}</Card.Title>
                        <ItemCount inicial={1} stock={10} onAdd={handleOnAdd} id={productId} nombre={title} precio={price} cantidad={cantidad} />
                    </Card.Body>
                </Card>
            </Col>

            <Col xs={12} md={6}>
                <h5>Información adicional:</h5>
                <p><strong>ID:</strong> {id}</p>
                <p><strong>Stock:</strong> {available_quantity}</p>
            </Col>
        </Row>
    </Container>
    )
}

export default ItemDetail