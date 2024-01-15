import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap'
import './DetalleProd.css'

const DetalleProd = () => {
    const { id } = useParams()
    const [producto, setProducto] = useState(null)

    useEffect(() => {
        try {
            fetch(`https://api.mercadolibre.com/items/${id}`)
                .then((response) => response.json())
                .then((json) => setProducto(json))
        } catch (error) {
            console.error(error)
        }
    }, [id]);

    if (!producto) {
        return <p>Cargando...</p>
    }

    return (
        <Container style={{marginTop: '70px'}} className='contenedorDetalle'>
            <h2>{producto.title}</h2>

            <Row className='filaContDet'>
                <Col xs={12} md={6}>
                    <Card>
                        {producto.pictures && producto.pictures.length > 0 && (
                            <Card.Img variant="top" src={producto.pictures[0].secure_url} alt={producto.pictures[0].id} />
                        )}
                        <Card.Body>
                            <Card.Title>Precio: {producto.price} {producto.currency_id}</Card.Title>

                            {producto.attributes && producto.attributes.length > 0 && (
                                <div>
                                    <h5>Atributos:</h5>
                                    <ul>
                                        {producto.attributes.map((attr) => (
                                            <li key={attr.id}>
                                                {attr.name}: <Badge variant="info">{attr.value_name}</Badge> 
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={6}>
                    {producto.variations && producto.variations.length > 0 && (
                        <div>
                            <h5>Variaciones:</h5>
                            <ListGroup>
                                {producto.variations.map((variation) => (
                                    <ListGroup.Item key={variation.id}>
                                        <strong>Precio:</strong> {variation.price} {producto.currency_id}
                                        <br />
                                        {variation.attribute_combinations.map((combo) => (
                                            <span key={combo.id}>
                                                <Badge variant="light">
                                                    <strong>{combo.name}:</strong> {combo.value_name}
                                                </Badge>{' '}
                                            </span>
                                        ))}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    )}
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <h5>Información adicional:</h5>
                    <p>
                        <strong>Dirección del vendedor:</strong> {producto.seller_address.city.name}, {producto.seller_address.state.name}, {producto.seller_address.country.name}
                    </p>

                    <p>
                        <strong>Envío:</strong> {producto.shipping.mode}, {producto.shipping.local_pick_up ? 'Retiro local disponible' : 'No disponible para retiro local'}
                    </p>

                    <p>
                        <strong>MercadoPago:</strong> {producto.accepts_mercadopago ? 'Aceptado' : 'No aceptado'}
                    </p>

                    <p>
                        <strong>Enlace al producto:</strong>{' '}
                        <a href={producto.permalink} target="_blank" rel="noopener noreferrer">
                            {producto.permalink}
                        </a>
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default DetalleProd