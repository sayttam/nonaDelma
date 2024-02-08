import cartImage from '/img/cart.png'
import './CartWidget.css'
import { useCart } from '../../context/CartContext'
import { Link } from 'react-router-dom'

const CartWidget = () => {
    const { getTotalQuantity } = useCart()
    const totalQuantity = getTotalQuantity()

    return (
        <>
            <Link to='./cart'>
                <img src={cartImage} alt="Carrito" className="imgCart" />
                <p className="contCart">{totalQuantity}</p>
            </Link>
        </>
    )
}

export default CartWidget