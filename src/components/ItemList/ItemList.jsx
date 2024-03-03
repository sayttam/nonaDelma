import Item from "../Item/Item"
import { Col, Row } from 'react-bootstrap'
import './ItemList.css'

const ItemList = ({ products }) => {
    if (products.length === 0) {
        return (
            <Row className='productos' style={{ marginTop: '120px' }}>
                <Col>
                    <div className="noExiste">
                        <h3>El producto no existe...</h3>
                    </div>
                </Col>
            </Row>
        );
    }

    return (
        <Row className='productos' style={{ marginTop: '120px' }}>
            {products.map(product => (
                <Item key={product.id} {...product} />
            ))}
        </Row>
    );
}

export default ItemList