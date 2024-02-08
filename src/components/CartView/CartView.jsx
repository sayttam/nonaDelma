import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { Container, Row, Col, Button } from "react-bootstrap"
import './CartView.css'

const CartView = () => {
    const { cart, total, removeItem } = useCart()
    
    return (
        <Container className="mt-4 container">
            <h1 className="mb-4">CART</h1>

            {cart.map((prod) => (
                <Row key={prod.id} className="mb-3">
                    <Col md={8}>
                        <div className="border p-3 d-flex align-items-center">
                            <div>
                                <h3>{prod.title}</h3>
                                <p className="mb-0">Cantidad: {prod.cantidad}</p>
                                <p className="mb-0">Precio por unidad: ${prod.price}</p>
                                <h4 className="mb-0">Subtotal: ${prod.cantidad * prod.price}</h4>
                            </div>
                        </div>
                    </Col>
                    <Col md={4} className="d-flex align-items-center">
                        <Button variant="danger" onClick={() => removeItem(prod.id)}>
                            Remover
                        </Button>
                    </Col>
                </Row>
            ))}

            <Row className="mt-4">
                <Col>
                    <h2 className="mb-0">Total: ${total}</h2>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <Link to="/checkout">
                        <Button variant="primary">Checkout</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default CartView
