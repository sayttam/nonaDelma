import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { Container, Row, Col, Button } from "react-bootstrap"

const CartView = () => {
    const { cart, total, removeItem } = useCart()
    console.log(total)
    return (
        <Container className="mt-4">
            <h1>CART</h1>

            <Row>
                {cart.map((prod) => (
                    <Col key={prod.id} md={6} className="mb-3">
                        <div className="d-flex justify-content-between align-items-center border p-3">
                            <div>
                                <h3>{prod.title}</h3>
                                <p>Cantidad: {prod.cantidad}</p>
                                <p>Precio por unidad: ${prod.price}</p>
                                <h4>Subtotal: ${prod.cantidad * prod.price}</h4>
                            </div>
                            <Button variant="danger" onClick={() => removeItem(prod.id)}>
                                Remover
                            </Button>
                        </div>
                    </Col>
                ))}
            </Row>

            <Row className="mt-4">
                <Col>
                    <h1>Total: ${total}</h1>
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