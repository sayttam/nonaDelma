import cartImage from '/img/cart.png'
import './CartWidget.css'
import { useContext, useState } from 'react'
import { useCart } from '../../context/CartContext'

const CartWidget = () => {
    const { getTotalQuantity, cart } = useCart()
    const {cartTotalQuantity, setCartTotalQuantity} = useState(0)

    return (
        <>
            <div>
                <img src={cartImage} alt="Carrito" className="imgCart" />
                <p className="contCart">{getTotalQuantity}</p>
            </div>
        </>
    )
}

export default CartWidget