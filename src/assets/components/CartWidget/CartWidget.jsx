import cart from '/img/cart.png'
import './CartWidget.css'

const CartWidget = ()=> {
let contadorCarrito = 0
return (
<>
<img src={cart} alt="Carrito" className="imgCart" />
<p className="contCart">{contadorCarrito}</p>
</>
)}

export default CartWidget