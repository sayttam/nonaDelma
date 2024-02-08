import Item from "../Item/Item"
import { Row } from 'react-bootstrap'
import './ItemList.css'

const ItemList = ({ products }) => {
    return(
        <Row className='productos'>
            {
                products.map(product => {
                    return (
                        <Item key={product.id} {...product}/>
                    )
                })
            }
        </Row>
    )
}

export default ItemList