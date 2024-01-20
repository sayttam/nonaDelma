import cart from '/img/cart.png'
import './CartWidget.css'
import { useContext } from 'react'
import { Contexto } from '../../App'

const CartWidget = () => {
    const { contextValue } = useContext(Contexto)
    return (
        <>
            <div>
                <img src={cart} alt="Carrito" className="imgCart" />
                <p className="contCart">{contextValue}</p>
            </div>
        </>
    )
}

export default CartWidget