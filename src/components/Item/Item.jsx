import { Link } from "react-router-dom"
import { ListGroup, Card, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import './Item.css'

const Item = ({ id, thumbnail, price, title }) => {
  const [titleSize, setTitleSize] = useState('')
  const [imageSize, setImageSize] = useState('')

  useEffect(() => {
    if (title.length > 19) {
      setTitleSize('largeTitle')
    } else {
      setTitleSize('')
    }
  }, [title])
  
  useEffect(() => {
    if (title.length > 19) {
      setImageSize('largeImg')
    } else {
      setImageSize('')
    }
  }, [thumbnail])

  return (
    <Col key={id} xs={12} sm={6} md={4} lg={3} className="colItem">
      <Card style={{ marginBottom: '10px', padding: '0 20px', height: '410px', minWidth: '250px' }}>
        <Card.Img variant='top' src={thumbnail} className={imageSize}/>
        <Card.Body>
          <Card.Title className={titleSize}>{title}</Card.Title>
          <Card.Text>
            <Link to={`/detalle/${id}`}>Detalle</Link>
          </Card.Text>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroup.Item>${price}</ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  )
}

export default Item